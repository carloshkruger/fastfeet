export const isTestEnvironment = (): boolean => {
  return process.env.NODE_ENV === 'test'
}
