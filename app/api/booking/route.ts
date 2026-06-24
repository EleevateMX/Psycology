import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { psychologistName, psychologistId, date, slot, modality, patient, confirmId } = body

    if (!patient?.email || !psychologistName) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.CONTACT_EMAIL || 'hola@psique.mx'

    if (apiKey) {
      // Email to patient
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Psique <noreply@psique.mx>',
          to: [patient.email],
          subject: `Cita confirmada con ${psychologistName} — Psique`,
          html: `
            <h2>¡Tu cita ha sido confirmada!</h2>
            <p><b>Psicólogo:</b> ${psychologistName}</p>
            <p><b>Fecha:</b> ${date}</p>
            <p><b>Hora:</b> ${slot}</p>
            <p><b>Modalidad:</b> ${modality === 'online' ? 'En línea' : 'Presencial'}</p>
            <p><b>Número de confirmación:</b> ${confirmId}</p>
            <hr>
            <p style="color:#6D28D9"><b>Psique</b> — Psicólogos verificados en Mérida</p>
          `,
        }),
      })

      // Notification to admin
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Psique <noreply@psique.mx>',
          to: [adminEmail],
          subject: `Nueva cita: ${patient.firstName} ${patient.lastName} → ${psychologistName}`,
          html: `
            <h2>Nueva cita agendada</h2>
            <p><b>Paciente:</b> ${patient.firstName} ${patient.lastName}</p>
            <p><b>Email:</b> ${patient.email}</p>
            <p><b>Teléfono:</b> ${patient.phone || '—'}</p>
            <p><b>Psicólogo:</b> ${psychologistName} (ID: ${psychologistId})</p>
            <p><b>Fecha:</b> ${date}</p>
            <p><b>Hora:</b> ${slot}</p>
            <p><b>Modalidad:</b> ${modality}</p>
            <p><b>Motivo:</b> ${patient.reason || '—'}</p>
            <p><b>Confirmación:</b> ${confirmId}</p>
          `,
        }),
      })
    } else {
      console.log('[Psique] Booking (no email configured):', { psychologistName, date, slot, patient: patient.email })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Psique] Booking API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
