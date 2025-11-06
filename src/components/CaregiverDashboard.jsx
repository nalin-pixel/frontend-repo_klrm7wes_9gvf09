import { useMemo } from 'react'
import { BarChart3, CalendarDays, ClipboardList } from 'lucide-react'

function StatCard({ label, value, accent = 'blue' }) {
  const color = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    rose: 'text-rose-600',
    violet: 'text-violet-600',
  }[accent] || 'text-blue-600'

  return (
    <div className="rounded-xl border p-4 bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  )
}

export default function CaregiverDashboard({ today = [], history = [] }) {
  const totals = useMemo(() => {
    const total = today.length
    const taken = today.filter((d) => d.taken).length
    const missed = total - taken
    const rate = total ? Math.round((taken / total) * 100) : 0
    return { total, taken, missed, rate }
  }, [today])

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
        <ClipboardList className="text-violet-600" size={20} /> Overview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total doses" value={totals.total} accent="blue" />
        <StatCard label="Taken" value={totals.taken} accent="green" />
        <StatCard label="Missed" value={totals.missed} accent="rose" />
        <StatCard label="Adherence" value={`${totals.rate}%`} accent="violet" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border p-4 bg-white/70 dark:bg-gray-900/40">
          <div className="flex items-center gap-2 text-sm font-medium mb-2"><CalendarDays size={16} /> Medication calendar</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Interactive calendar coming soon. Navigate months and see color-coded adherence per day.</p>
        </div>
        <div className="rounded-xl border p-4 bg-white/70 dark:bg-gray-900/40">
          <div className="flex items-center gap-2 text-sm font-medium mb-2"><BarChart3 size={16} /> Reports & analytics</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Trends for 7/14/30/90 days with per-medicine performance and CSV export.</p>
        </div>
      </div>
    </section>
  )
}
