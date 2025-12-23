import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: tiers, error } = await supabase
        .from("ticket_tiers")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format for frontend
    const formattedTiers = tiers.map((tier) => {
        let status = "available";
        if (tier.sold_count >= tier.capacity) {
            status = "sold-out";
        } else if (tier.capacity - tier.sold_count < 20) {
            status = "limited";
        }

        return {
            id: tier.id,
            name: tier.name,
            price: tier.price / 100, // Convert cents to dollars
            perks: getPerksForTier(tier.id),
            status,
        };
    });

    return NextResponse.json(formattedTiers);
}

function getPerksForTier(id: string) {
    switch (id) {
        case "pit":
            return ["Closest to stage", "Early entry", "VIP Lanyard"];
        case "vip":
            return ["Premium seat", "Lounge access", "Exclusive merch"];
        case "ga":
            return ["Lawn access", "First come first serve"];
        default:
            return [];
    }
}
