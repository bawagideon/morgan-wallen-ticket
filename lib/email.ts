import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail(email: string, tickets: any[]) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Morgan Wallen Tickets <onboarding@resend.dev>', // Default testing domain
            to: [email],
            subject: 'Your Morgan Wallen Tickets',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #000; text-transform: uppercase;">You're going to the show!</h1>
                    <p>Thank you for your purchase. Here are your tickets for <strong>Morgan Wallen: One Night At A Time 2026</strong>.</p>
                    
                    <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        ${tickets.map(t => `
                            <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                                <p style="margin: 0; font-weight: bold; font-size: 18px;">${t.tier_name}</p>
                                <p style="margin: 0; color: #666;">Ticket ID: ${t.id}</p>
                            </div>
                        `).join('')}
                    </div>

                    <p>You can view your digital tickets and QR codes at any time in our portal:</p>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/my-tickets" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; text-transform: uppercase;">View My Tickets</a>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Email sending failed:", err);
        return false;
    }
}
