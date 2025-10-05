import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail({ subject, text, html }) {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent via Resend:", data);
    return data;
  } catch (error) {
    console.error("❌ Error sending email via Resend:", error);
    throw error;
  }
}
