// 📁 client/src/services/emailService.ts
import axios from "axios";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  try {
    const response = await axios.post("http://localhost:3002/api/send-email", {
      to,
      subject,
      text,
      html,
    });

    return response.data; // { success: true, data } or { success: false, error }
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
};
