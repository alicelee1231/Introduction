import { Resend } from "resend";

const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.REACT_APP_SENDER_EMAIL || "your-verified-sender@domain.com",
      to,
      subject,
      text,
      html: html || text,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
