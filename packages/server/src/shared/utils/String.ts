export const isEmpty = (text: string | null | undefined): boolean => {
  if (text === null || text === undefined) {
    return true
  }

  return String(text).trim().length === 0
}
