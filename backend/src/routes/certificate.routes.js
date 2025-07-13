import { Router } from "express";
import Certificate from "../models/Certificate.js";

const router = Router();

router.post('/store', async (req, res) => {
  const { studentId, courseId, certificateNumber } = req.body;
  try {
    const cert = new Certificate({ studentId, courseId, certificateNumber, issuedAt: new Date() });
    await cert.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;