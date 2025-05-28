// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createMessage } from "@/api/services/Message";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;
    const result = await createMessage(data);
    return res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({ error: "Failed to save message" });
  }
}
