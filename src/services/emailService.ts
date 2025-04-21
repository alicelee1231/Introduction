import { Resend } from "resend";

// API 키가 없으면 에러를 즉시 표시
if (!process.env.REACT_APP_RESEND_API_KEY) {
  console.error("Resend API key is not set in environment variables");
}

const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  try {
    const response = await fetch("http://localhost:8080/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        text,
        html: html || text,
        from: process.env.REACT_APP_SENDER_EMAIL,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send email");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
