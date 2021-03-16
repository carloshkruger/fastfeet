interface AuthTokenProviderDecrypterResponse {
  userId: string
}

interface AuthTokenProvider {
  generate(userId: string): string
  decrypt(token: string): AuthTokenProviderDecrypterResponse
}

export { AuthTokenProvider, AuthTokenProviderDecrypterResponse }
