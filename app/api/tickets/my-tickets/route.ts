import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Fetch tickets and join with tier info
    const { data: tickets, error } = await supabase
        .from("tickets")
        .select(`
      id,
      created_at,
      tier_id,
      ticket_tiers (
        name,
        price
      )
    `)
        .eq("user_email", email)
        .eq("status", "paid")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Fetch tickets error:", error);
        return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
    }

    return NextResponse.json({ tickets });
}
