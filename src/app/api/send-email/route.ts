import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Force Node.js runtime (required for nodemailer)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // Check if SMTP_PASSWORD is set
    if (!process.env.SMTP_PASSWORD) {
      console.error('SMTP_PASSWORD is not set');
      return NextResponse.json({ error: "SMTP configuration missing" }, { status: 500 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

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
      from: '"Arcan Transactions" <contact@helveit.ch>',
      to: "kevin.mntrc@gmail.com",
      subject: "Nouveau dossier - Critères d'investissement",
      text: "Veuillez trouver ci-joint le dossier généré depuis le formulaire de critères d'investissement.",
      attachments: [
        {
          filename: 'arcan_criteres_investissement.pdf',
          content: buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending email:', errorMessage);
    return NextResponse.json({ error: `Email error: ${errorMessage}` }, { status: 500 });
  }
}
