import { sendMail } from "../../lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { service, name, email, phone } = req.body;
  if (!service || !name || !email)
    return res.status(400).json({ message: "Service, name, and email are required." });

  try {
    await sendMail({
      subject: `New Get Started Form Submission from ${name}`,
      text: `Service: ${service}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}`,
      html: `<h2>New Get Started Form Submission</h2>
             <p><strong>Service:</strong> ${service}</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || "N/A"}</p>`,
    });

    console.log(`✅ Get Started email sent for ${name}`);
    return res.status(200).json({ message: "Email sent successfully 🚀" });
  } catch (err) {
    console.error("🔥 Error sending Get Started email:", err);
    return res.status(500).json({ message: "Failed to send email. Check server logs.", error: err.message });
  }
}
