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
    if (!process.env.REACT_APP_RESEND_API_KEY) {
      throw new Error("Resend API key is not configured");
    }

    if (!process.env.REACT_APP_SENDER_EMAIL) {
      throw new Error("Sender email is not configured");
    }

    const { data, error } = await resend.emails.send({
      from: process.env.REACT_APP_SENDER_EMAIL,
      to,
      subject,
      text,
      html: html || text,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in sendEmail:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
