import { sendMail } from "../../lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { name, email, service, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: "Name, email, and message are required." });

  try {
    await sendMail({
      subject: service ? `New Contact Request: ${service}` : "New Contact Request",
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || "Not specified"}\nMessage: ${message}`,
      html: `<h2>New Contact Message</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Service:</strong> ${service || "Not specified"}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Error sending message" });
  }
}
