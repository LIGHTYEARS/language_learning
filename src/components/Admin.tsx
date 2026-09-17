import { useCallback, useEffect, useState } from 'react'
import {
  clearAdminSecret,
  fetchAdminStats,
  getAdminSecret,
  postAdminSeed,
  setAdminSecret,
  type AdminStats,
} from '../lib/api'
import styles from './Home.module.css'

interface Props {
  onBack: () => void
  apiOnline: boolean
}

export function Admin({ onBack, apiOnline }: Props) {
  const [secret, setSecret] = useState(getAdminSecret())
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const saveSecret = () => {
    setAdminSecret(secret.trim())
    setMsg('Secret saved to sessionStorage')
  }

  const loadStats = useCallback(async () => {
    setBusy(true)
    setMsg('')
    const res = await fetchAdminStats()
    setBusy(false)
    if (!res.ok) {
      setStats(null)
      setMsg(res.error)
      return
    }
    setStats(res.stats)
  }, [])

  useEffect(() => {
    if (apiOnline && getAdminSecret()) void loadStats()
  }, [apiOnline, loadStats])

  const seed = async () => {
    setBusy(true)
    setMsg('')
    const res = await postAdminSeed()
    setBusy(false)
    if (!res.ok) {
      setMsg(res.error)
      return
    }
    setMsg(`Seeded ${res.seeded} cards (${res.cards_in_db} in DB)`)
    await loadStats()
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin</h1>
          <p className={styles.sub}>
            API {apiOnline ? 'online' : 'offline'} · secret for mutating routes
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.ghost} onClick={onBack}>
            返回
          </button>
        </div>
      </header>

      <section className={styles.list} style={{ listStyle: 'none', padding: 0 }}>
        <div className={styles.card} style={{ padding: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            ADMIN_SECRET
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }}
              autoComplete="off"
            />
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" className={styles.primary} onClick={saveSecret}>
              Save secret
            </button>
            <button
              type="button"
              className={styles.ghost}
              onClick={() => {
                clearAdminSecret()
                setSecret('')
                setMsg('Secret cleared')
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className={styles.ghost}
              disabled={!apiOnline || busy}
              onClick={() => void loadStats()}
            >
              Refresh stats
            </button>
            <button
              type="button"
              className={styles.primary}
              disabled={!apiOnline || busy}
              onClick={() => void seed()}
            >
              Seed from vocab/cards.json
            </button>
          </div>
          {msg && (
            <p style={{ marginTop: '0.75rem', color: '#445' }} role="status">
              {msg}
            </p>
          )}
        </div>

        {stats && (
          <div className={styles.card} style={{ padding: '1rem', marginTop: 12 }}>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>Stats · {stats.today}</h2>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.7 }}>
              <li>cards: {stats.cards}</li>
              <li>fsrs rows: {stats.fsrs_rows}</li>
              <li>reviews: {stats.reviews}</li>
              <li>due today: {stats.due_today}</li>
              <li>
                status — new {stats.status.new} / learning {stats.status.learning} / weak{' '}
                {stats.status.weak}
              </li>
            </ul>
            {stats.recent_reviews.length > 0 && (
              <>
                <h3 style={{ margin: '0.75rem 0 0.25rem', fontSize: '1rem' }}>Recent reviews</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                  {stats.recent_reviews.map((r, i) => (
                    <li key={`${r.created_at}-${i}`}>
                      {r.lemma} · {r.rating} · {r.created_at}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
