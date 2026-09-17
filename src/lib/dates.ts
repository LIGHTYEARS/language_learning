/** Asia/Shanghai (UTC+8) calendar helpers — no DST. */

export function todayShanghai(): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return fmt.format(new Date()) // YYYY-MM-DD
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  // noon UTC avoids DST edge; Shanghai is fixed +8
  const dt = new Date(Date.UTC(y, m - 1, d, 4, 0, 0)) // 12:00 CST
  dt.setUTCDate(dt.getUTCDate() + days)
  const yy = dt.getUTCFullYear()
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(dt.getUTCDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

export function isDue(due: string, today = todayShanghai()): boolean {
  return due <= today
}
