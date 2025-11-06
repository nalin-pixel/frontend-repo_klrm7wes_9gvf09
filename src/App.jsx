import { useEffect, useMemo, useState } from 'react'
import GreetingHeader from './components/GreetingHeader'
import MedicationReminders from './components/MedicationReminders'
import CaregiverDashboard from './components/CaregiverDashboard'
import ModeSwitcher from './components/ModeSwitcher'

const demoMeds = [
  {
    id: '1',
    name: 'Metformin',
    dosage: '500 mg',
    notes: 'Take with breakfast. Stay hydrated.',
    time: '08:00',
    photo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=528&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Lisinopril',
    dosage: '10 mg',
    notes: 'Monitor blood pressure.\n    ',
    time: '13:00',
    photo: 'https://images.unsplash.com/photo-1580281657527-47a985a7b94b?q=80&w=528&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20 mg',
    notes: 'Take in the evening after dinner.',
    time: '20:00',
    photo: 'https://images.unsplash.com/photo-1573883431205-98b847fe2bed?q=80&w=528&auto=format&fit=crop',
  },
]

export default function App() {
  const [dark, setDark] = useState(false)
  const [mode, setMode] = useState('elderly')

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  const todayWithStatus = useMemo(() => demoMeds.map((m, i) => ({ ...m, taken: i % 2 === 0 })), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100">
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(50%_50%_at_50%_20%,black,transparent)]">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-72 w-[36rem] bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-5xl px-6 py-10 space-y-8">
        <GreetingHeader mode={mode} dark={dark} onToggleDark={() => setDark((d) => !d)} />

        <ModeSwitcher onModeChange={setMode} />

        {mode === 'elderly' ? (
          <section className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-6">
              <MedicationReminders items={demoMeds} />
            </div>
            <div className="rounded-2xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-6">
              <h2 className="text-xl font-semibold tracking-tight mb-3">Emergency contacts</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between rounded-lg border p-3"><span>Dr. Patel (Primary)</span><a className="text-blue-600 hover:underline" href="tel:+15550001">Call</a></li>
                <li className="flex items-center justify-between rounded-lg border p-3"><span>Alex (Caregiver)</span><a className="text-blue-600 hover:underline" href="tel:+15550002">Call</a></li>
                <li className="flex items-center justify-between rounded-lg border p-3"><span>911 (Emergency)</span><a className="text-blue-600 hover:underline" href="tel:911">Call</a></li>
              </ul>
            </div>
          </section>
        ) : (
          <section className="space-y-6">
            <div className="rounded-2xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-6">
              <CaregiverDashboard today={todayWithStatus} />
            </div>
            <div className="rounded-2xl border bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-6">
              <h2 className="text-xl font-semibold tracking-tight mb-3">History</h2>
              <ul className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                {todayWithStatus.map((m) => (
                  <li key={m.id} className="flex items-center justify-between py-3">
                    <span className="truncate mr-3">{m.name} — {m.time}</span>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${m.taken ? 'bg-green-600/10 text-green-700 dark:text-green-300' : 'bg-rose-600/10 text-rose-700 dark:text-rose-300'}`}>
                      {m.taken ? 'Taken' : 'Missed'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <footer className="pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Built with care • ElderEase — empowering independence and peace of mind
        </footer>
      </main>
    </div>
  )
}
