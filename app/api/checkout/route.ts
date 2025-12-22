import { NextResponse } from "next/server";
import Stripe from "stripe";
import { TIERS } from "@/components/TicketModal";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia", // Use latest or a generally safe version
});

export async function POST(request: Request) {
    try {
        const { cart } = await request.json();

        // Validate cart and format line items
        const lineItems = cart.map((item: { tierId: string; quantity: number }) => {
            const tier = TIERS.find((t) => t.id === item.tierId);
            if (!tier) {
                throw new Error(`Invalid tier ID: ${item.tierId}`);
            }

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: tier.name,
                    },
                    unit_amount: tier.price * 100, // Stripe expects cents
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
