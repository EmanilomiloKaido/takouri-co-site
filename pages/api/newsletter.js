// pages/api/newsletter.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = req.body.email?.trim();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: "New Newsletter Signup",
      html: `
        <h2>New Subscriber!</h2>
        <p>Email: ${email}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Newsletter signup successful!" });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}
