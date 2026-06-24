'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 text-sm text-violet-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors w-full"
    >
      <LogOut size={16} />
      Cerrar sesión
    </button>
  )
}
