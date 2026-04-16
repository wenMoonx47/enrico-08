import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, company, message } = result.data;

    // If no Resend API key, just return success (dev mode)
    if (!process.env.RESEND_API_KEY) {
      console.log('Contact form submission (no Resend key):', { name, email, company, message });
      return NextResponse.json({ success: true, message: 'Message received (dev mode)' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Portfolio Contact <noreply@enricoperania.dev>',
      to: 'enricoperania@gmail.com',
      subject: `New contact from ${name}${company ? ` @ ${company}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0B0118; color: #F5F3FF; border-radius: 12px;">
          <h1 style="color: #A78BFA; font-size: 24px; margin-bottom: 24px;">New Portfolio Contact</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B5B95; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</td>
              <td style="padding: 8px 0; color: #F5F3FF;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B5B95; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #A78BFA;">${email}</a></td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 8px 0; color: #6B5B95; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
              <td style="padding: 8px 0; color: #F5F3FF;">${company}</td>
            </tr>
            ` : ''}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(167,139,250,0.12); border-radius: 8px;">
            <p style="color: #6B5B95; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Message</p>
            <p style="color: #F5F3FF; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
