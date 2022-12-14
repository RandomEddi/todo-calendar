export const equalDates = (date1: Date | null, date2: Date | null): boolean => {
  if (date1 !== null && date2 !== null) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }
  return false
}
