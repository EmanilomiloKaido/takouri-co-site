import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load .env explicitly
dotenv.config({ path: path.resolve('./.env') });

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP Connection Successful!");

    const info = await transporter.sendMail({
      from: `"Takouri Co" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "Titan SMTP Test ✅",
      text: "This is a test email from Node.js using Titan SMTP.",
    });

    console.log("📨 Email Sent Successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ SMTP Error:", error);
  }
}

sendTestEmail();
