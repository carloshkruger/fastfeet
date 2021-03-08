interface AuthTokenProvider {
  generate(userId: string): string
}

export { AuthTokenProvider }
