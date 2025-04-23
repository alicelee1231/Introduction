const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const port = 3002;

console.log(`📢 Server start attempt at: ${new Date()}`);

app.use(cors());
app.use(express.json());

console.log("✅ Middleware setup complete");

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: to, subject, text",
      });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: [to],
      subject,
      text,
      html: html || text,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      return res.status(400).json({ success: false, error });
    }

    console.log("✅ Email sent:", data);
    res.json({ success: true, data });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

// graceful shutdown (optional but good practice)
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down...");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down...");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
