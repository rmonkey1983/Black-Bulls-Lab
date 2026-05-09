import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { company, name, email, phone, message } = body;

    if (!company || !name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Mancano campi obbligatori' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Black Bulls Lab <noreply@blackbullslab.com>',
      to: 'info@blackbullslab.com',
      subject: `Nuova Richiesta Enterprise: ${company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #c8a44e;">
          <h1 style="color: #c8a44e; margin-bottom: 24px; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Richiesta Corporate Enterprise</h1>
          
          <div style="background: #141414; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #c8a44e;">Azienda:</strong> ${company}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #c8a44e;">Referente:</strong> ${name}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #c8a44e;">Email:</strong> ${email}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #c8a44e;">Telefono:</strong> ${phone}</p>
          </div>

          <div style="background: #141414; padding: 24px; border-radius: 8px;">
            <h2 style="color: #c8a44e; font-size: 14px; text-transform: uppercase; margin-bottom: 12px;">Messaggio / Visione</h2>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #cccccc;">${message}</p>
          </div>

          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #222222; padding-top: 20px;">
            Black Bulls Lab — Advanced Entertainment
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Errore Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error('Errore API Corporate:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
