import { useEffect, useMemo, useState } from 'react'
import { Sun, Moon, User, Users } from 'lucide-react'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDate(date) {
  return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function GreetingHeader({ mode = 'elderly', dark, onToggleDark }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const greeting = useMemo(() => {
    const h = now.getHours()
    if (h < 12) return 'Good morning'
    if (h < 18) return 'Good afternoon'
    return 'Good evening'
  }, [now])

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-2 shadow">
            {mode === 'elderly' ? <User size={20} /> : <Users size={20} />}
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {greeting}{' '}
            {mode === 'elderly' ? '— welcome back' : '— caregiver dashboard'}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {formatDate(now)} · {formatTime(now)}
        </p>
      </div>
      <button
        onClick={onToggleDark}
        className="self-start inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
        <span>{dark ? 'Dark' : 'Light'} mode</span>
      </button>
    </header>
  )
}
