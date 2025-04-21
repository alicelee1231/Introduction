const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

// 서버 시작 시간 기록
const startTime = new Date();
console.log(`Server start attempt at: ${startTime}`);

const app = express();
const port = 3002;

// 기본 라우트 추가
app.get("/", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

console.log("Express app created, setting up middleware...");

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 프로세스 종료 핸들러
const gracefulShutdown = () => {
  console.log("Received shutdown signal. Cleaning up...");
  process.exit(0);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // 서버를 종료하지 않고 계속 실행
  console.log("Continuing execution after uncaught exception");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // 서버를 종료하지 않고 계속 실행
  console.log("Continuing execution after unhandled rejection");
});

console.log("Setting up CORS and JSON middleware...");
app.use(cors());
app.use(express.json());

console.log("Initializing Resend client...");
const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Saemmi <hello@send.alicelee1231.xyz>",
      to: [to],
      subject,
      text,
      html: html || text,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(400).json({ success: false, error });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

console.log("Starting server...");
// 서버 시작
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server started at: ${new Date()}`);
  console.log(`Uptime: ${process.uptime()} seconds`);
});

// 서버 에러 핸들링
server.on("error", (error) => {
  console.error("Server error:", error);
  console.log("Continuing execution after server error");
});

// 주기적인 상태 로깅
setInterval(() => {
  console.log(`Server status: running, uptime: ${process.uptime()} seconds`);
}, 30000); // 30초마다 상태 로깅

console.log("Server initialization complete");
