"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// const prisma = new PrismaClient(); // Removed local instantiation

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
        await prisma.meetAndGreetRegistration.create({
            data: {
                name,
                email,
                tier,
                state,
                city: city || null,
                preferredDate: new Date(), // Placeholder or from form
            },
        });

        // In a real app we might redirect or return success
        return { success: true };
    } catch (error) {
        console.error("Registration failed:", error);
        return { error: "Failed to register" };
    }
}
