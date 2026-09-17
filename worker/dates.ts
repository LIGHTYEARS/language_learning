/** Asia/Shanghai (UTC+8) calendar helpers — no DST. */

export function todayShanghai(now = new Date()): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return fmt.format(now) // YYYY-MM-DD
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d, 4, 0, 0)) // 12:00 CST
  dt.setUTCDate(dt.getUTCDate() + days)
  const yy = dt.getUTCFullYear()
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(dt.getUTCDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

export function nowIsoShanghai(now = new Date()): string {
  // Store UTC ISO for updated_at / created_at timestamps
  return now.toISOString()
}
