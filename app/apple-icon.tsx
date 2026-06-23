import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '96px',
      }}
    >
      <div style={{ color: 'white', fontSize: 280, fontWeight: 900, fontFamily: 'serif', lineHeight: 1 }}>ψ</div>
    </div>,
    { ...size }
  )
}
