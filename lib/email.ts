import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // host: 'smtp.gmail.com',
  // port: 587,
  // secure: false,
});

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html: `
    <p>You requested to reset your password.</p>
    <p>${text}

    <p>If you did not request this, please ignore this email</p>
    `,
  });
}
