import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pill, CheckCircle2, Clock } from 'lucide-react'

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export default function MedicationReminders({ items = [] }) {
  const [takenSet, setTakenSet] = useState(new Set())

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
  }, [items])

  const toggleTaken = (id) => {
    setTakenSet((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
        <Pill className="text-blue-600" size={20} /> Today's Reminders
      </h2>

      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {sorted.map((med) => {
            const taken = takenSet.has(med.id)
            return (
              <motion.li
                key={med.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`rounded-xl border p-4 flex items-center gap-4 bg-white/70 dark:bg-gray-900/40 backdrop-blur-sm transition ${taken ? 'opacity-70' : ''}`}
              >
                <img
                  src={med.photo}
                  alt={med.name}
                  className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-800"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{med.dosage}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                      <Clock size={16} /> {med.time}
                    </div>
                  </div>
                  {med.notes && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{med.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => toggleTaken(med.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                    taken
                      ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600'
                  }`}
                >
                  <CheckCircle2 size={18} /> {taken ? 'Taken' : 'Mark taken'}
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}
