// pages/api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  // Placeholder: use AI only for advanced responses
  // Currently, automated responses handled in frontend
  return res.status(200).json({ message: "Handled by automated logic in ChatBoard" });
}
