const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  // CORS 설정
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // OPTIONS 요청 처리
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // POST 요청만 허용
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { to, subject, text, html } = JSON.parse(event.body);

    if (!to || !subject || !text) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields: to, subject, text",
        }),
      };
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
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error }),
      };
    }

    console.log("✅ Email sent:", data);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error("❌ Server Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
    };
  }
};
