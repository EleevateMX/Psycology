'use client';

import { useState } from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import {
  LayoutDashboard,
  User,
  Calendar,
  Star,
  CreditCard,
  Settings,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronRight,
  Edit2,
  Save,
  Camera,
  MessageSquare,
  Lock,
  Zap,
  Shield,
  BarChart2,
  Bell,
} from 'lucide-react';

type Section = 'resumen' | 'perfil' | 'agenda' | 'opiniones' | 'plan' | 'configuracion';

const navItems: { key: Section; label: string; icon: React.ReactNode }[] = [
  { key: 'resumen', label: 'Resumen', icon: <LayoutDashboard size={18} /> },
  { key: 'perfil', label: 'Mi perfil', icon: <User size={18} /> },
  { key: 'agenda', label: 'Agenda', icon: <Calendar size={18} /> },
  { key: 'opiniones', label: 'Opiniones', icon: <Star size={18} /> },
  { key: 'plan', label: 'Plan actual', icon: <CreditCard size={18} /> },
  { key: 'configuracion', label: 'Configuración', icon: <Settings size={18} /> },
];

const mockCitas = [
  { paciente: 'Carlos M.', fecha: 'Hoy, 09:00', modalidad: 'Presencial', estado: 'Confirmada' },
  { paciente: 'Sofía R.', fecha: 'Hoy, 10:30', modalidad: 'En línea', estado: 'Confirmada' },
  { paciente: 'Luis P.', fecha: 'Hoy, 12:00', modalidad: 'Presencial', estado: 'Pendiente' },
  { paciente: 'Ana T.', fecha: 'Mañana, 09:00', modalidad: 'En línea', estado: 'Confirmada' },
  { paciente: 'Jorge V.', fecha: 'Mañana, 11:00', modalidad: 'Presencial', estado: 'Pendiente' },
];

const mockReviews = [
  {
    initials: 'CM',
    name: 'Carlos M.',
    stars: 5,
    date: '15 jun 2026',
    comment:
      'La Dra. García es increíble. Me ayudó a superar mi ansiedad con técnicas muy prácticas. Totalmente recomendada.',
    reply:
      'Muchas gracias, Carlos. Ha sido un placer acompañarte en este proceso. ¡Sigue adelante!',
  },
  {
    initials: 'SR',
    name: 'Sofía R.',
    stars: 5,
    date: '10 jun 2026',
    comment:
      'Excelente profesional, muy empática y puntual. Las sesiones online funcionan perfectamente.',
    reply: null,
  },
  {
    initials: 'AT',
    name: 'Ana T.',
    stars: 5,
    date: '2 jun 2026',
    comment:
      'Llevo 3 meses con la Dra. García y los cambios en mi vida han sido notables. Muy recomendable.',
    reply: 'Ana, es un orgullo ver tu progreso. ¡Gracias por confiar en mí!',
  },
  {
    initials: 'LP',
    name: 'Luis P.',
    stars: 4,
    date: '28 may 2026',
    comment: 'Muy buena profesional. A veces las sesiones se sienten cortas pero el contenido es excelente.',
    reply: null,
  },
];

const DAYS = ['Lun 23', 'Mar 24', 'Mié 25', 'Jue 26', 'Vie 27'];
const HOURS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

type SlotStatus = 'reservado' | 'libre' | 'bloqueado' | 'vacio';

const agendaData: Record<string, SlotStatus> = {
  'Lun 23-09:00': 'reservado',
  'Lun 23-10:00': 'reservado',
  'Lun 23-11:00': 'libre',
  'Lun 23-12:00': 'libre',
  'Lun 23-14:00': 'bloqueado',
  'Lun 23-15:00': 'bloqueado',
  'Lun 23-16:00': 'libre',
  'Lun 23-17:00': 'libre',
  'Mar 24-09:00': 'reservado',
  'Mar 24-10:00': 'libre',
  'Mar 24-11:00': 'reservado',
  'Mar 24-12:00': 'libre',
  'Mar 24-14:00': 'libre',
  'Mar 24-15:00': 'reservado',
  'Mar 24-16:00': 'bloqueado',
  'Mar 24-17:00': 'libre',
  'Mié 25-09:00': 'reservado',
  'Mié 25-10:00': 'reservado',
  'Mié 25-11:00': 'reservado',
  'Mié 25-12:00': 'libre',
  'Mié 25-14:00': 'libre',
  'Mié 25-15:00': 'libre',
  'Mié 25-16:00': 'reservado',
  'Mié 25-17:00': 'libre',
  'Jue 26-09:00': 'libre',
  'Jue 26-10:00': 'reservado',
  'Jue 26-11:00': 'libre',
  'Jue 26-12:00': 'bloqueado',
  'Jue 26-14:00': 'reservado',
  'Jue 26-15:00': 'reservado',
  'Jue 26-16:00': 'libre',
  'Jue 26-17:00': 'libre',
  'Vie 27-09:00': 'libre',
  'Vie 27-10:00': 'libre',
  'Vie 27-11:00': 'reservado',
  'Vie 27-12:00': 'libre',
  'Vie 27-14:00': 'libre',
  'Vie 27-15:00': 'bloqueado',
  'Vie 27-16:00': 'bloqueado',
  'Vie 27-17:00': 'libre',
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

function getFormattedDate() {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= count ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </span>
  );
}

function EstadoBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    Confirmada: 'bg-green-100 text-green-700',
    Pendiente: 'bg-amber-100 text-amber-700',
    'En línea': 'bg-violet-100 text-violet-700',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${map[estado] ?? 'bg-gray-100 text-gray-600'}`}>
      {estado}
    </span>
  );
}

function SlotCell({ status }: { status: SlotStatus }) {
  const map: Record<SlotStatus, string> = {
    reservado: 'bg-violet-500 text-white text-xs font-medium',
    libre: 'bg-green-100 text-green-700 text-xs',
    bloqueado: 'bg-gray-200 text-gray-400 text-xs',
    vacio: 'bg-white',
  };
  const label: Record<SlotStatus, string> = {
    reservado: 'Reservado',
    libre: 'Libre',
    bloqueado: 'Bloqueado',
    vacio: '',
  };
  return (
    <div className={`rounded-lg h-10 flex items-center justify-center ${map[status]}`}>
      {label[status]}
    </div>
  );
}

// ─── Section: Resumen ────────────────────────────────────────────────────────

function SectionResumen({ onAction }: { onAction: () => void }) {
  const greeting = getGreeting();
  const dateStr = getFormattedDate();

  const stats = [
    {
      label: 'Visitas al perfil esta semana',
      value: '243',
      sub: '+18% vs semana pasada',
      icon: <TrendingUp size={20} className="text-green-500" />,
      iconBg: 'bg-green-50',
    },
    {
      label: 'Solicitudes de cita',
      value: '12',
      sub: '3 pendientes de confirmar',
      icon: <Calendar size={20} className="text-violet-600" />,
      iconBg: 'bg-violet-50',
    },
    {
      label: 'Calificación promedio',
      value: '4.9 ★',
      sub: '127 reseñas',
      icon: <Star size={20} className="text-amber-400" />,
      iconBg: 'bg-amber-50',
    },
    {
      label: 'Próximas consultas hoy',
      value: '3',
      sub: 'Primera a las 09:00',
      icon: <Clock size={20} className="text-blue-500" />,
      iconBg: 'bg-blue-50',
    },
  ];

  const actividad = [
    { text: 'Nueva solicitud de cita de Carlos M.', time: 'hace 2h', dot: 'bg-violet-500' },
    { text: 'Reseña 5 estrellas de Sofía R.', time: 'hace 4h', dot: 'bg-amber-400' },
    { text: 'Tu perfil fue visto 47 veces hoy', time: 'hace 6h', dot: 'bg-blue-400' },
    { text: 'Pago de sesión confirmado', time: 'hace 1 día', dot: 'bg-green-500' },
  ];

  const rendimiento = [
    { label: 'Búsquedas donde apareces', value: '1,240', pct: 82 },
    { label: 'Clics en tu perfil', value: '243', pct: 65 },
    { label: 'Conversión a cita', value: '12', pct: 28 },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, Dra. García
        </h1>
        <p className="text-sm text-gray-500 capitalize mt-0.5">{dateStr}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.iconBg}`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Próximas citas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Próximas citas</h2>
          <button
            onClick={onAction}
            className="text-xs text-violet-600 font-medium hover:text-violet-800 flex items-center gap-1"
          >
            Ver todas <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <th className="text-left px-6 py-3 font-medium">Paciente</th>
                <th className="text-left px-6 py-3 font-medium">Fecha y hora</th>
                <th className="text-left px-6 py-3 font-medium">Modalidad</th>
                <th className="text-left px-6 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockCitas.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-gray-900">{c.paciente}</td>
                  <td className="px-6 py-3.5 text-gray-600">{c.fecha}</td>
                  <td className="px-6 py-3.5 text-gray-600">{c.modalidad}</td>
                  <td className="px-6 py-3.5">
                    <EstadoBadge estado={c.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Actividad reciente */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Actividad reciente</h2>
          <ul className="space-y-4">
            {actividad.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${a.dot}`} />
                <div>
                  <p className="text-sm text-gray-800">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Rendimiento del perfil */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Rendimiento del perfil</h2>
          <div className="space-y-5">
            {rendimiento.map((r) => (
              <div key={r.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-gray-700">{r.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{r.value}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-violet-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{r.pct}% de alcance máximo</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Mi perfil ──────────────────────────────────────────────────────

function SectionPerfil({ onAction }: { onAction: () => void }) {
  const [editando, setEditando] = useState<string | null>(null);
  const [campos, setCampos] = useState({
    nombre: 'Dra. María García López',
    especialidad: 'Psicología Clínica y Cognitivo-Conductual',
    bio: 'Especialista en ansiedad, depresión y terapia de pareja con más de 10 años de experiencia. Enfoque humanista y basado en evidencia.',
    telefono: '+34 612 345 678',
  });

  const handleSave = () => {
    setEditando(null);
    onAction();
  };

  const badges = ['Ansiedad', 'Depresión', 'Terapia de pareja', 'Cognitivo-Conductual', 'Online'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>
        <p className="text-sm text-gray-500 mt-0.5">Así te ven los pacientes en Psique</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-violet-600 flex items-center justify-center text-white text-2xl font-bold">
              MG
            </div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition-colors">
              <Camera size={13} className="text-white" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">Dra. María García</p>
            <p className="text-sm text-gray-500">Psicóloga Clínica · Madrid</p>
            <button className="mt-1.5 text-xs text-violet-600 font-medium hover:underline">
              Cambiar foto
            </button>
          </div>
        </div>

        {/* Campos editables */}
        <div className="space-y-5">
          {(
            [
              { key: 'nombre', label: 'Nombre completo' },
              { key: 'especialidad', label: 'Especialidad' },
              { key: 'bio', label: 'Biografía' },
              { key: 'telefono', label: 'Teléfono de contacto' },
            ] as { key: keyof typeof campos; label: string }[]
          ).map(({ key, label }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {label}
                </label>
                {editando !== key && (
                  <button
                    onClick={() => setEditando(key)}
                    className="text-xs text-violet-600 hover:text-violet-800 flex items-center gap-1"
                  >
                    <Edit2 size={12} /> Editar
                  </button>
                )}
              </div>
              {editando === key ? (
                <div className="flex gap-2">
                  {key === 'bio' ? (
                    <textarea
                      className="flex-1 text-sm border border-violet-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                      rows={3}
                      value={campos[key]}
                      onChange={(e) => setCampos({ ...campos, [key]: e.target.value })}
                    />
                  ) : (
                    <input
                      className="flex-1 text-sm border border-violet-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300"
                      value={campos[key]}
                      onChange={(e) => setCampos({ ...campos, [key]: e.target.value })}
                    />
                  )}
                  <button
                    onClick={() => setEditando(null)}
                    className="text-xs text-gray-400 px-2"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-800 bg-gray-50 rounded-lg px-3 py-2">{campos[key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="mt-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Especialidades / Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-700 text-white rounded-xl text-sm font-medium hover:bg-violet-800 transition-colors shadow-sm"
          >
            <Save size={15} />
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Agenda ─────────────────────────────────────────────────────────

function SectionAgenda({ onAction }: { onAction: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agenda semanal</h1>
          <p className="text-sm text-gray-500 mt-0.5">Semana del 23 al 27 de junio, 2026</p>
        </div>
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Lock size={14} />
          Bloquear horario
        </button>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4">
        {[
          { color: 'bg-violet-500', label: 'Reservado' },
          { color: 'bg-green-100 border border-green-300', label: 'Libre' },
          { color: 'bg-gray-200', label: 'Bloqueado' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${l.color}`} />
            <span className="text-xs text-gray-600">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Calendario */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-20">Hora</th>
              {DAYS.map((d) => (
                <th key={d} className="px-3 py-3 text-xs font-medium text-gray-700 text-center">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {HOURS.map((h) => (
              <tr key={h}>
                <td className="px-4 py-2 text-xs text-gray-400 font-medium">{h}</td>
                {DAYS.map((d) => {
                  const key = `${d}-${h}`;
                  const status: SlotStatus = agendaData[key] ?? 'vacio';
                  return (
                    <td key={d} className="px-3 py-2">
                      <SlotCell status={status} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section: Opiniones ──────────────────────────────────────────────────────

function SectionOpiniones({ onAction }: { onAction: () => void }) {
  const [respondiendo, setRespondiendo] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Opiniones de pacientes</h1>
        <p className="text-sm text-gray-500 mt-0.5">Lo que dicen sobre ti</p>
      </div>

      {/* Rating overview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center">
          <p className="text-6xl font-extrabold text-gray-900">4.9</p>
          <div className="flex justify-center mt-1">
            <StarRating count={5} />
          </div>
          <p className="text-xs text-gray-400 mt-1">127 reseñas</p>
        </div>
        <div className="flex-1 w-full space-y-2">
          {[
            { stars: 5, pct: 91 },
            { stars: 4, pct: 7 },
            { stars: 3, pct: 2 },
            { stars: 2, pct: 0 },
            { stars: 1, pct: 0 },
          ].map((r) => (
            <div key={r.stars} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-4">{r.stars}</span>
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-amber-400 h-2 rounded-full"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-8 text-right">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {mockReviews.map((rev, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {rev.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{rev.name}</p>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
                <StarRating count={rev.stars} />
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">{rev.comment}</p>

                {rev.reply && (
                  <div className="mt-3 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3">
                    <p className="text-xs font-semibold text-violet-700 mb-1">Tu respuesta:</p>
                    <p className="text-sm text-violet-800">{rev.reply}</p>
                  </div>
                )}

                {!rev.reply && (
                  <div className="mt-3">
                    {respondiendo === i ? (
                      <div className="space-y-2">
                        <textarea
                          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                          rows={2}
                          placeholder="Escribe tu respuesta..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setRespondiendo(null); onAction(); }}
                            className="px-3 py-1.5 bg-violet-700 text-white rounded-lg text-xs font-medium hover:bg-violet-800"
                          >
                            Publicar respuesta
                          </button>
                          <button
                            onClick={() => setRespondiendo(null)}
                            className="px-3 py-1.5 text-gray-500 text-xs hover:text-gray-700"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRespondiendo(i)}
                        className="flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-800 font-medium"
                      >
                        <MessageSquare size={13} /> Responder
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Plan ───────────────────────────────────────────────────────────

function SectionPlan({ onAction }: { onAction: () => void }) {
  const features = [
    'Perfil destacado en búsquedas',
    'Hasta 50 citas al mes',
    'Estadísticas avanzadas',
    'Soporte prioritario',
    'Respuesta a reseñas',
    'Integración con videoconferencia',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plan actual</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestiona tu suscripción</p>
      </div>

      {/* Plan card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-violet-700 to-violet-500 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-violet-200">Plan activo</p>
              <h2 className="text-3xl font-extrabold mt-1">Profesional</h2>
            </div>
            <div className="text-right">
              <p className="text-4xl font-extrabold">$299</p>
              <p className="text-violet-200 text-sm">/mes</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-xl px-4 py-2 inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Activo · Renueva el 24 jul 2026</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Incluido en tu plan:</h3>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={13} className="text-violet-600" />
                </div>
                <span className="text-sm text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={onAction}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm"
          >
            <Zap size={16} />
            Mejorar a Premium
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-red-200 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors">
            Cancelar suscripción
          </button>
        </div>
      </div>

      {/* Premium teaser */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Plan Premium</p>
            <p className="text-sm text-gray-500">$499/mes · Todo en Profesional, más:</p>
          </div>
        </div>
        <ul className="space-y-2">
          {['Citas ilimitadas', 'Posición #1 en tu especialidad', 'CRM de pacientes incluido', 'IA para gestión de agenda'].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
              <Star size={13} className="text-orange-400 fill-orange-400 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Section: Configuración ──────────────────────────────────────────────────

function SectionConfiguracion({ onAction }: { onAction: () => void }) {
  const [notifs, setNotifs] = useState({
    email: true,
    sms: false,
    nuevaCita: true,
    recordatorio: true,
    reseña: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500 mt-0.5">Personaliza tu experiencia</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Bell size={16} className="text-violet-600" /> Notificaciones
          </h3>
          <div className="space-y-4">
            {(
              [
                { key: 'email', label: 'Notificaciones por email' },
                { key: 'sms', label: 'Notificaciones por SMS' },
                { key: 'nuevaCita', label: 'Nueva solicitud de cita' },
                { key: 'recordatorio', label: 'Recordatorio de cita (24h antes)' },
                { key: 'reseña', label: 'Nueva reseña recibida' },
              ] as { key: keyof typeof notifs; label: string }[]
            ).map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{label}</span>
                <button
                  onClick={() => { setNotifs({ ...notifs, [key]: !notifs[key] }); onAction(); }}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    notifs[key] ? 'bg-violet-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      notifs[key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart2 size={16} className="text-violet-600" /> Privacidad
          </h3>
          <p className="text-sm text-gray-500">
            Tu perfil es visible públicamente. Solo los datos que configures serán mostrados a los pacientes.
          </p>
          <button
            onClick={onAction}
            className="mt-3 text-xs text-violet-600 font-medium hover:underline"
          >
            Ver política de privacidad
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>('resumen');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleNavClick = (key: Section) => {
    setActiveSection(key);
    setSidebarOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'resumen':
        return <SectionResumen onAction={showToast} />;
      case 'perfil':
        return <SectionPerfil onAction={showToast} />;
      case 'agenda':
        return <SectionAgenda onAction={showToast} />;
      case 'opiniones':
        return <SectionOpiniones onAction={showToast} />;
      case 'plan':
        return <SectionPlan onAction={showToast} />;
      case 'configuracion':
        return <SectionConfiguracion onAction={showToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar overlay en mobile ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-violet-900 flex flex-col z-30 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-violet-800">
          <span className="text-white text-xl font-extrabold tracking-tight">ψ Psique</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto md:hidden text-violet-300 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile */}
        <div className="px-5 py-5 border-b border-violet-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              MG
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Dra. María García</p>
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-semibold rounded-full">
                Plan Profesional
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left
                  ${isActive
                    ? 'bg-white/15 text-white'
                    : 'text-violet-200 hover:bg-white/10 hover:text-white'}
                `}
              >
                {item.icon}
                {item.label}
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Ver perfil público + Logout */}
        <div className="px-4 py-5 border-t border-violet-800 space-y-2">
          <Link
            href="/psicologos/1"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Ver mi perfil público
            <ChevronRight size={14} />
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar móvil */}
        <header className="md:hidden h-14 bg-white border-b border-gray-100 flex items-center px-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu size={20} />
          </button>
          <span className="flex-1 text-center text-lg font-extrabold text-violet-900 tracking-tight">
            ψ Psique
          </span>
          <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
            MG
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          {renderSection()}
        </main>
      </div>

      {/* ── Toast ── */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-2xl shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
          <p className="text-sm font-medium">Cambios guardados correctamente</p>
          <button
            onClick={() => setToastVisible(false)}
            className="ml-2 text-green-600 hover:text-green-800"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
