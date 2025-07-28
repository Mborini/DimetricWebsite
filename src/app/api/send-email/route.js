import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { from_name, from_email, message } = body;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${from_name}" <${from_email}>`,
      to: 'ahamd@dimetric.net',
      subject: `New Contact Message from ${from_name}`,
      text: message,
    });

    return Response.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
