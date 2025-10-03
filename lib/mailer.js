// lib/mailer.js
import nodemailer from "nodemailer";

let transporter;

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true", // SSL true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
};

// initialize once
transporter = createTransporter();

export const sendMail = async ({ subject, text, html }) => {
  if (!transporter) transporter = createTransporter();

  try {
    await transporter.verify();  // test SMTP connection
    console.log("✅ SMTP connection successful");

    const info = await transporter.sendMail({
      from: `"Takouri Co." <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("🔥 SMTP Error:", err.message);
    throw err;
  }
};
