import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { psychologistName, psychologistId, date, slot, modality, patient, confirmId } = body

    if (!patient?.email || !psychologistName) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('psique_bookings')
      .insert({
        confirm_id: confirmId,
        psychologist_id: String(psychologistId),
        psychologist_name: psychologistName,
        patient_first_name: patient.firstName,
        patient_last_name: patient.lastName,
        patient_email: patient.email,
        patient_phone: patient.phone || null,
        appointment_date: date,
        appointment_slot: slot,
        modality,
        reason: patient.reason || null,
        status: 'pending',
      })

    if (dbError) {
      console.error('[Psique] DB error saving booking:', dbError.message)
    }

    // Send emails via Resend (if configured)
    const apiKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.CONTACT_EMAIL || 'hola@psique.mx'

    if (apiKey) {
      const emailRequests = [
        // Patient confirmation
        fetch('https://api.resend.com/emails', {
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
        }),
        // Admin notification
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Psique <noreply@psique.mx>',
            to: [adminEmail],
            subject: `Nueva cita: ${patient.firstName} → ${psychologistName}`,
            html: `
              <h2>Nueva cita agendada</h2>
              <p><b>Paciente:</b> ${patient.firstName} ${patient.lastName}</p>
              <p><b>Email:</b> ${patient.email}</p>
              <p><b>Psicólogo:</b> ${psychologistName} (ID: ${psychologistId})</p>
              <p><b>Fecha:</b> ${date} a las ${slot}</p>
              <p><b>Modalidad:</b> ${modality}</p>
              <p><b>Motivo:</b> ${patient.reason || '—'}</p>
              <p><b>Confirmación:</b> ${confirmId}</p>
            `,
          }),
        }),
      ]
      await Promise.allSettled(emailRequests)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Psique] Booking API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
