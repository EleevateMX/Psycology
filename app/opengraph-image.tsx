import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Psique — Psicólogos verificados en Mérida'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5B21B6 0%, #6D28D9 50%, #7C3AED 100%)',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', color: 'white', fontWeight: 900,
          }}>
            ψ
          </div>
          <span style={{ fontSize: '40px', fontWeight: 800, color: 'white', letterSpacing: '-1px' }}>
            Psique
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '56px', fontWeight: 900, color: 'white',
          textAlign: 'center', lineHeight: 1.1,
          margin: '0 0 20px 0', letterSpacing: '-2px',
          maxWidth: '900px',
        }}>
          Psicólogos verificados en Mérida
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: '28px', color: 'rgba(255,255,255,0.75)',
          textAlign: 'center', margin: '0 0 48px 0',
          maxWidth: '700px', lineHeight: 1.3,
        }}>
          Encuentra apoyo psicológico confiable · Presencial y en línea
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '48px' }}>
          {[
            { value: '200+', label: 'psicólogos' },
            { value: '4.8★', label: 'calificación' },
            { value: '100%', label: 'verificados' },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '36px', fontWeight: 800, color: 'white' }}>{value}</span>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute', bottom: '32px',
          fontSize: '20px', color: 'rgba(255,255,255,0.5)',
        }}>
          psique.mx
        </div>
      </div>
    ),
    { ...size }
  )
}
