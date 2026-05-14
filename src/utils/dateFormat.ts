function toDate(value: Date | string | number) {
  return value instanceof Date ? value : new Date(value)
}

export function formatTime(value: Date | string | number) {
  return toDate(value).toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDate(value: Date | string | number) {
  return toDate(value).toLocaleDateString("da-DK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export function formatDateLong(value: Date | string | number) {
  return toDate(value).toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDateNoYear(value: Date | string | number) {
  return toDate(value).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
  })
}
