import { Brain, WifiOff } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-50">
      <div className="text-center p-8">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-24 h-24 bg-violet-100 rounded-3xl flex items-center justify-center">
            <Brain size={44} className="text-violet-600" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white">
            <WifiOff size={16} className="text-gray-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-violet-800 mb-2">Sin conexión</h1>
        <p className="text-gray-500">Revisa tu conexión a internet para continuar usando Psique.</p>
      </div>
    </div>
  )
}
