import axios from "axios";
import { course } from "../models/course.model.js";
import { Teacher } from "../models/teacher.model.js";

export const chatWithOpenRouter = async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Fetch all courses and teachers (no limit)
    const coursesList = await course.find().select("coursename description");
    const teachers = await Teacher.find().select("Firstname Lastname Teacherdetails");

    // About Us section
    const aboutUs =
      "Gurukul is dedicated to transforming lives through accessible, innovative digital education. Our mission is to empower every learner to reach their full potential in an inclusive, engaging environment.\n";

    // Format course info
    const courseInfo = coursesList.map(c =>
      `${c.coursename}: ${c.description}`
    ).join("; ");

    // Format teacher info
    const teacherInfo = teachers.map(t =>
      `${t.Firstname} ${t.Lastname}`
    ).join("; ");

    // Build system prompt
    const systemPrompt =
      aboutUs +
      `You are 'EduBot', a smart, friendly assistant on the Gurukul website.\n` +
      `Our main sections are: Home, Courses, About, Contact, and Admin Login.\n` +
      `Students must log in and register for courses to access learning materials.\n` +
      `We offer ${coursesList.length} courses (e.g., ${courseInfo}).\n` +
      `Our teaching team includes ${teachers.length} expert instructors (e.g., ${teacherInfo}).\n` +
      `Help users with course info, study tips, platform navigation, and learning support. Be warm, conversational, and concise.\n` +
      `Do not make up information or hallucinate. Only provide information that is accurate and based on the provided data. If you do not know the answer, say so.`;

    const newMessages = [
      { role: "system", content: systemPrompt },
      ...messages.filter(m => m.role !== "system")
    ];

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-small-3.2-24b-instruct-2506:free",
        messages: newMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("OpenRouter API error:", error?.response?.data || error.message);
    return res.status(500).json({ error: "OpenRouter API error" });
  }
};