function toDate(value: Date | string | number) {
  return value instanceof Date ? value : new Date(value)
}

export function formatTime(value: Date | string | number) {
  return toDate(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDate(value: Date | string | number) {
  return toDate(value).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}