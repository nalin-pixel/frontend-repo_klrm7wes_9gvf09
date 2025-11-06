import { useState } from 'react'
import { Lock, Shield, HeartHandshake } from 'lucide-react'

export default function ModeSwitcher({ onModeChange, pinEnabled = true }) {
  const [mode, setMode] = useState('elderly')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleSwitch = (next) => {
    if (next === 'caregiver' && pinEnabled) {
      if (pin !== '1234') {
        setError('Incorrect PIN. Try 1234.')
        return
      }
    }
    setError('')
    setMode(next)
    onModeChange?.(next)
  }

  return (
    <div className="rounded-xl border p-4 bg-white/70 dark:bg-gray-900/40 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <HeartHandshake size={16} /> Mode & security
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleSwitch('elderly')}
          className={`px-3 py-2 rounded-full text-sm font-medium border transition ${
            mode === 'elderly'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
          }`}
        >
          Elderly mode
        </button>
        <button
          onClick={() => handleSwitch('caregiver')}
          className={`px-3 py-2 rounded-full text-sm font-medium border transition ${
            mode === 'caregiver'
              ? 'bg-violet-600 text-white border-violet-600'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
          }`}
        >
          Caregiver mode
        </button>
        {pinEnabled && (
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="PIN"
                className="pl-8 pr-3 py-2 rounded-lg border bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <span className="text-xs text-gray-500">Default: 1234</span>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-rose-600 flex items-center gap-1"><Shield size={14} /> {error}</p>}
    </div>
  )
}
