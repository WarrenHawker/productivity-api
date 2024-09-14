import nodemailer from 'nodemailer';

// Create a Nodemailer transporter using Gmail SMTP
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SENDER_ACCOUNT, // Your Gmail address
    pass: process.env.EMAIL_SENDER_PASSWORD, // Your Gmail password (or app-specific password if using 2FA)
  },
});

const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  try {
    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER_ACCOUNT,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
