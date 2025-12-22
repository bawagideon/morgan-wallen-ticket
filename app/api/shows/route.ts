import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("shows")
            .select("*")
            .order("date", { ascending: true });

        if (error) throw error;

        return NextResponse.json({ shows: data });
    } catch (error: any) {
        console.error("Error fetching shows:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
