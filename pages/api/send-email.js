import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'info@takouri.co.za',
      to: 'info@takouri.co.za',
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    console.log('✅ Email sent:', data);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
