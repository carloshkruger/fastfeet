const removeNonNumericCharacters = (text: string): string => {
  return text.replace(/\D/g, '')
}

export { removeNonNumericCharacters }
