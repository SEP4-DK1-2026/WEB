// AI generated file, could not solve manually

const MS_PER_DAY = 24 * 60 * 60 * 1000
const DEFAULT_TARGET_POINTS = 28
const MIN_POINTS_PER_DAY = 1
const MAX_POINTS_PER_DAY = 24

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getUtcDayStartMs(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
}

function getInclusiveDayCount(startDate: Date, endDate: Date) {
  const startMs = getUtcDayStartMs(startDate)
  const endMs = getUtcDayStartMs(endDate)
  return Math.max(1, Math.round((endMs - startMs) / MS_PER_DAY) + 1)
}

export function scaleTimeSeriesData<T>(
  items: T[],
  getDate: (item: T) => Date,
  targetPoints: number = DEFAULT_TARGET_POINTS,
): T[] {
  if (!items || items.length === 0) return []

  const sorted = [...items].sort(
    (a, b) => getDate(a).getTime() - getDate(b).getTime(),
  )

  const minDate = getDate(sorted[0])
  const maxDate = getDate(sorted[sorted.length - 1])

  const days = getInclusiveDayCount(minDate, maxDate)
  const pointsPerDay = clamp(
    Math.round(targetPoints / days),
    MIN_POINTS_PER_DAY,
    MAX_POINTS_PER_DAY,
  )
  const maxPoints = days * pointsPerDay

  if (sorted.length <= maxPoints) return sorted

  const bucketMs = MS_PER_DAY / pointsPerDay
  const startMs = getUtcDayStartMs(minDate)
  const endMs = startMs + days * MS_PER_DAY

  const result: T[] = []
  let index = 0

  for (
    let bucketStart = startMs;
    bucketStart < endMs;
    bucketStart += bucketMs
  ) {
    const bucketEnd = bucketStart + bucketMs
    const midpoint = bucketStart + bucketMs / 2

    while (
      index < sorted.length &&
      getDate(sorted[index]).getTime() < bucketStart
    ) {
      index += 1
    }

    let bestIndex = -1
    let bestDistance = Number.POSITIVE_INFINITY
    let probe = index

    while (probe < sorted.length) {
      const time = getDate(sorted[probe]).getTime()
      if (time >= bucketEnd) break

      const distance = Math.abs(time - midpoint)
      if (distance < bestDistance) {
        bestDistance = distance
        bestIndex = probe
      }

      probe += 1
    }

    if (bestIndex >= 0) {
      result.push(sorted[bestIndex])
    }

    index = probe
  }

  return result
}
