function getDayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function getDailyTicks<T>(
  items: T[],
  getDate: (item: T) => Date,
  maxTicks?: number,
) {
  const ticks: number[] = []
  let lastKey = ""

  for (const item of items) {
    const date = getDate(item)
    const key = getDayKey(date)
    if (key !== lastKey) {
      ticks.push(date.getTime())
      lastKey = key
    }
  }

  if (!maxTicks || ticks.length <= maxTicks) {
    return ticks
  }

  const reduced: number[] = []
  const lastIndex = ticks.length - 1
  const steps = Math.max(1, maxTicks - 1)

  for (let i = 0; i <= steps; i += 1) {
    const index = Math.round((i * lastIndex) / steps)
    const value = ticks[index]
    if (value !== reduced[reduced.length - 1]) {
      reduced.push(value)
    }
  }

  return reduced
}
