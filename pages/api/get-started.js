// pages/api/get-started.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { service, name, email, phone } = req.body;

  if (!service || !name || !email) {
    return res
      .status(400)
      .json({ message: "Service, name, and email are required." });
  }

  // Debug: check env vars
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_PORT:", process.env.SMTP_PORT);
  console.log("SMTP_SECURE:", process.env.SMTP_SECURE);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "****" : "NOT SET");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Verify SMTP connection
  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful!");
  } catch (err) {
    console.error("🔥 SMTP connection failed:", err);
    return res.status(500).json({
      message: "SMTP connection failed. Check server console.",
      error: err.message,
    });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.TO_EMAIL,
    subject: `New Get Started Form Submission from ${name}`,
    text: `Service: ${service}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}`,
    html: `<p><strong>Service:</strong> ${service}</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone || "N/A"}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("🔥 Nodemailer error:", err);
    return res.status(500).json({
      message: "Failed to send email. Check server console.",
      error: err.message,
    });
  }
}
