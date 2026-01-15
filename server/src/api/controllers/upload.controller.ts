import { Request, Response } from "express";
import { uploadToCloudinary } from "../middlewares/uploadHelper";

export const uploadController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing required parameter - file" });
    }
    
    const result = await uploadToCloudinary(req.file.buffer) as { secure_url: string; public_id: string };
    res.json({ data: {
      url: result.secure_url,
      public_id: result.public_id,
    }});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}