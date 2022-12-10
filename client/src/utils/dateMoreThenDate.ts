export const dateMoreThenDate = (
  date1: Date | null,
  date2: Date | null
): boolean => {
  if (date1 !== null && date2 !== null) {
    return date1.getTime() >= date2.getTime()
  }
  return false
}
