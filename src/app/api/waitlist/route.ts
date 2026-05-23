import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = waitlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Aquí iría la integración con base de datos o servicio (Ej. Resend, Supabase, etc.)
    // console.log("New waitlist email:", result.data.email);

    return NextResponse.json(
      { message: "¡Gracias por unirte a la lista de espera!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in waitlist endpoint:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
