import DataUriParser from "datauri/parser.js";
import path from "path";
import { createTransport } from "nodemailer";

export const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export const sendToken = (user, res, message, statusCode) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: `${message}, ${user.name}`,
      token: token,
    });
};

export const cookieOptions = {
  secure: process.env.NODE_ENV === "Development" ? false : true,
  httpOnly: process.env.NODE_ENV === "Development" ? false : true,
  sameSite: process.env.NODE_ENV === "Development" ? false : "none",
};

export const sendEmail = async (subject, to, text) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST, // Mailtrap host (sandbox.smtp.mailtrap.io)
    port: process.env.SMTP_PORT, // Mailtrap port (2525)
    auth: {
      user: process.env.SMTP_USER, // Your SMTP username (from Mailtrap)
      pass: process.env.SMTP_PASSWORD, // Your SMTP password (from Mailtrap)
    },
  });

  try {
    // Sending the email
    await transporter.sendMail({
      from: process.env.SMTP_USER, // The email address you're sending from (same as SMTP user)
      to, // Recipient email address
      subject, // Email subject
      text, // Email body content
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
