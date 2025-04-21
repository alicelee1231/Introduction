const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
