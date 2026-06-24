import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, tel, especialidad, cedula, ciudad, modalidad } = body

    if (!nombre || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('psique_contact_requests')
      .insert({
        nombre,
        email,
        telefono: tel || null,
        especialidad: especialidad || null,
        cedula: cedula || null,
        ciudad: ciudad || null,
        modalidad: modalidad || [],
      })

    if (dbError) {
      console.error('[Psique] DB error saving contact:', dbError.message)
    }

    // Send email via Resend (if configured)
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_EMAIL || 'hola@psique.mx'

    if (apiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Psique <noreply@psique.mx>',
          to: [toEmail],
          subject: `Nuevo psicólogo registrado: ${nombre}`,
          html: `
            <h2>Nueva solicitud de registro</h2>
            <p><b>Nombre:</b> ${nombre}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Teléfono:</b> ${tel || '—'}</p>
            <p><b>Especialidad:</b> ${especialidad || '—'}</p>
            <p><b>Cédula:</b> ${cedula || '—'}</p>
            <p><b>Ciudad:</b> ${ciudad || '—'}</p>
            <p><b>Modalidad:</b> ${Array.isArray(modalidad) ? modalidad.join(', ') : '—'}</p>
          `,
        }),
      }).catch(err => console.error('[Psique] Resend error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Psique] Contact API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
