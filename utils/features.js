import DataUriParser from "datauri/parser.js";
import path from "path";
import { createTransport } from "nodemailer";

export const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

// export const sendToken = (user, res, message, statusCode) => {
//   const token = user.generateToken();

//   res
//     .status(statusCode)
//     .cookie("token", token, {
//       ...cookieOptions,
//       expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     })
//     .json({
//       success: true,
//       message: message,
//     });
// };

export const sendToken = (user, res, message, statusCode) => {
  const token = user.getSignedToken();

  // Set expiration time to 1 second
  const expiresIn = 1;

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + expiresIn * 1000),
    })
    .json({
      success: true,
      message,
      token,
    });
};
export const cookieOptions = {
  secure: process.env.NODE_ENV === "Development" ? false : true,
  httpOnly: process.env.NODE_ENV === "Development" ? false : true,
  sameSite: process.env.NODE_ENV === "Development" ? false : "none",
};

export const sendEmail = async (subject, to, text) => {
  const transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "dbd0b5629dcf08",
      pass: "06d546dd191019",
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};
