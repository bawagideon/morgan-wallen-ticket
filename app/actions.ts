"use server";

import { supabase } from "@/lib/supabase";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover" as any,
});

export async function joinMailingList(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const zipCode = formData.get("zipCode") as string;

    if (!firstName || !lastName || !email || !zipCode) {
        return { error: "All fields are required" };
    }

    try {
        const { error } = await supabase
            .from('mailing_list_subscribers')
            .insert({
                first_name: firstName,
                last_name: lastName,
                email,
                zip_code: zipCode
            });

        if (error) {
            if (error.code === '23505') { // Unique violation
                return { error: "You are already subscribed!" };
            }
            throw error;
        }

        return { success: true };
    } catch (error: any) {
        console.error("Mailing list error:", error);
        return { error: "Failed to join mailing list" };
    }
}

export async function registerForMeetAndGreet(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const dob = formData.get("dob") as string;
    const instagram = formData.get("instagram") as string || null;
    const showId = formData.get("show_id") as string;

    // Basic validation
    if (!name || !email || !phone || !dob || !showId) {
        return { error: "Missing required fields" };
    }

    try {
        // 1. Create Supabase Record
        const { data: record, error: dbError } = await supabase
            .from('meet_and_greets')
            .insert({
                full_name: name,
                email,
                phone,
                dob,
                instagram_handle: instagram,
                show_id: showId,
                status: 'pending_payment'
            })
            .select('id')
            .single();

        if (dbError) {
            console.error("Supabase error:", dbError);
            throw new Error("Database insertion failed");
        }

        // 2. Create Stripe Session
        const headersList = await headers();
        const origin = headersList.get("origin");

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Meet & Greet Package",
                            description: "Exclusive backstage access, photo op, and signed merchandise.",
                        },
                        unit_amount: 15000, // $150.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/meet-and-greet`,
            metadata: {
                registration_id: record.id
            },
            customer_email: email,
        });

        if (!session.url) {
            throw new Error("Stripe session URL missing");
        }

        return { success: true, url: session.url };

    } catch (error: any) {
        console.error("Registration failed:", error);
        return { error: error.message || "Failed to register" };
    }
}
