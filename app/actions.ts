"use server";

import { supabase } from "@/lib/supabase";

export async function registerForMeetAndGreet(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const tier = formData.get("tier") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;

    if (!name || !email || !tier || !state) {
        return { error: "Missing required fields" };
    }

    try {
        const { error } = await supabase
            .from('meet_and_greet_registrations')
            .insert({
                name,
                email,
                tier,
                state,
                city: city || null,
                preferred_date: new Date().toISOString(),
            });

        if (error) {
            console.error("Supabase error:", error);
            throw new Error(error.message);
        }

        return { success: true };
    } catch (error) {
        console.error("Registration failed:", error);
        return { error: "Failed to register" };
    }
}
