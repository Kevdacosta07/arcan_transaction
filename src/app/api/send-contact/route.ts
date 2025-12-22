import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Force Node.js runtime (required for nodemailer)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    const { firstName, lastName, email, message } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    // Check if SMTP_PASSWORD is set
    if (!process.env.SMTP_PASSWORD) {
      console.error('SMTP_PASSWORD is not set');
      return NextResponse.json({ error: "SMTP configuration missing" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "mail.helveit.ch",
      port: 465,
      secure: true,
      auth: {
        user: "contact@helveit.ch",
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Arcan Transactions - Contact" <contact@helveit.ch>',
      to: "contact@arcan-transactions.ch",
      replyTo: email,
      subject: `Nouveau message de contact - ${firstName} ${lastName}`,
      text: `
Nouveau message reçu via le formulaire de contact du site Arcan Transactions.

Expéditeur:
-----------
Prénom: ${firstName}
Nom: ${lastName}
Email: ${email}

Message:
--------
${message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #021024; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #021024; }
    .message-box { background-color: white; padding: 15px; border-left: 3px solid #5483B3; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">Nouveau Message de Contact</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Prénom:</span> ${firstName}
      </div>
      <div class="field">
        <span class="label">Nom:</span> ${lastName}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="message-box">
        <span class="label">Message:</span>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    <div class="footer">
      Message envoyé depuis le site arcan-transactions.ch
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending email:', errorMessage);
    return NextResponse.json({ error: `Email error: ${errorMessage}` }, { status: 500 });
  }
}
