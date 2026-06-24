import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, tel, especialidad, cedula, ciudad, modalidad } = body

    if (!nombre || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

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
            <table>
              <tr><td><b>Nombre:</b></td><td>${nombre}</td></tr>
              <tr><td><b>Email:</b></td><td>${email}</td></tr>
              <tr><td><b>Teléfono:</b></td><td>${tel || '—'}</td></tr>
              <tr><td><b>Especialidad:</b></td><td>${especialidad || '—'}</td></tr>
              <tr><td><b>Cédula:</b></td><td>${cedula || '—'}</td></tr>
              <tr><td><b>Ciudad:</b></td><td>${ciudad || '—'}</td></tr>
              <tr><td><b>Modalidad:</b></td><td>${(modalidad || []).join(', ')}</td></tr>
            </table>
          `,
        }),
      })
    } else {
      console.log('[Psique] Contact form submission (no email configured):', { nombre, email, especialidad })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Psique] Contact API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
