export function formatWindDirection(degrees: number) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  return directions[Math.round(degrees / 45) % 8]
}

export function formatDate(date: Date) {
  return date.toLocaleString("da-DK", {
    dateStyle: "short",
    timeStyle: "short",
  })
}

export function formatWholeNumber(value: number) {
  return Math.round(value).toString()
}

export function formatOneDecimal(value: number) {
  return value.toFixed(1)
}