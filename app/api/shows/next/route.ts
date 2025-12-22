import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Using server role for API routes if needed, or anon if public
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("shows")
            .select("date")
            .gte("date", new Date().toISOString()) // Only future shows
            .order("date", { ascending: true })
            .limit(1)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No Data found code
                return NextResponse.json({ date: null });
            }
            throw error;
        }

        return NextResponse.json({ date: data?.date || null });
    } catch (error: any) {
        console.error("Error fetching next show:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
