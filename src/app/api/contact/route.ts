import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "El nombre es demasiado corto" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z.string().min(5, { message: "El mensaje es demasiado corto" }),
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();

    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurado. Verifica tus variables de entorno en Vercel.");
      return NextResponse.json(
        { error: "SERVER_ERROR" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();
    const { name, email, message, locale } = body;

    // Validation
    const validationResult = contactSchema.safeParse({ name, email, message });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    // HTML para la notificación al equipo (team)
    const teamHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
        <p>Has recibido un nuevo mensaje desde el formulario de contacto de tu sitio web:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nombre:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6;">
          <strong style="display: block; margin-bottom: 8px; color: #4b5563;">Mensaje:</strong>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 15px;">
          Este correo fue generado de manera automática por el formulario de la landing de ReadVC.
        </div>
      </div>
    `;

    // HTML para la confirmación al usuario (user)
    const userSubject = locale === 'es' ? 'Hemos recibido tu mensaje - ReadVC' : 'We received your message - ReadVC';
    const userHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">${locale === 'es' ? '¡Hola' : 'Hello'} ${name}!</h2>
        <p>${locale === 'es' 
          ? 'Gracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto contigo pronto.' 
          : 'Thank you for reaching out. We have received your message and our team will get back to you shortly.'}</p>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6;">
          <strong style="display: block; margin-bottom: 8px; color: #4b5563;">${locale === 'es' ? 'Tu mensaje:' : 'Your message:'}</strong>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #6b7280;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 15px;">
          ReadVC Team
        </div>
      </div>
    `;

    // Enviar los correos usando el SDK oficial de Resend
    const { data, error } = await resend.batch.send([
      {
        from: "ReadVC Contacto <noreply@readvc.app>",
        to: ["hello@readvc.app"],
        subject: `📩 Nuevo mensaje de ${name}`,
        replyTo: email,
        html: teamHtml,
      },
      {
        from: "ReadVC Contacto <noreply@readvc.app>",
        to: [email],
        subject: userSubject,
        html: userHtml,
      }
    ]);

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { error: "RESEND_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}

