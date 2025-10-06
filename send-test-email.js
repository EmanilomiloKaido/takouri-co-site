import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "Test Email from Takouri",
      html: "<p>This is a test email sent via Resend API.</p>",
    });
    console.log("✅ Email sent:", data);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

sendTestEmail();
