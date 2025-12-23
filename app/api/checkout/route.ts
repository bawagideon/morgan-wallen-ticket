import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover" as any, // Cast to any to avoid strict type mismatch if types are slightly off, but using suggested version.
});

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // MUST use Service Role for checking inventory without RLS issues? Or Anon is fine if reading public?
    // Using Service Role is safer for server-side logic usually, but let's check if we have it. 
    // The prompt says "SUPABASE_SERVICE_ROLE_KEY (used in API routes)". I will use logic to check env or fallback? 
    // Actually, reading inventory is public. But later we might want to lock. 
    // Let's stick to standard practice. I will use process.env.SUPABASE_SERVICE_ROLE_KEY.
);

// If service role not allowed in client bundle, this file is server-only so it matches.

export async function POST(request: Request) {
    try {
        const { cart } = await request.json();

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // 1. Enforce Ticket Limit
        const totalQty = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
        if (totalQty > 6) {
            return NextResponse.json({ error: "You cannot purchase more than 6 tickets." }, { status: 400 });
        }

        // 2. Fetch Tiers from DB to validate price and inventory
        const tierIds = cart.map((i: any) => i.tierId);
        const { data: dbTiers, error } = await supabase
            .from("ticket_tiers")
            .select("*")
            .in("id", tierIds);

        if (error || !dbTiers) {
            throw new Error("Failed to fetch tier data");
        }

        const lineItems = [];

        // 3. Build Line Items & Check Inventory
        for (const item of cart) {
            const dbTier = dbTiers.find((t) => t.id === item.tierId);
            if (!dbTier) {
                throw new Error(`Invalid tier: ${item.tierId}`);
            }

            // Inventory Check
            if (dbTier.sold_count + item.quantity > dbTier.capacity) {
                return NextResponse.json({ error: `Not enough tickets remaining for ${dbTier.name}` }, { status: 400 });
            }

            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: dbTier.name,
                        metadata: {
                            tierId: dbTier.id, // Pass for Webhook
                        }
                    },
                    unit_amount: dbTier.price, // Already in cents in DB
                },
                quantity: item.quantity,
            });
        }

        // 4. Create Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            metadata: {
                type: "ticket_purchase",
                // We can't put complex data easily, but line_items will have it in the webhook expansion
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
