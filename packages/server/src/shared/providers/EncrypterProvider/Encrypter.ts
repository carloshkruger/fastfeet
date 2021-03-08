interface EncrypterCompareParams {
  plainTextValue: string
  encryptedValue: string
}

interface Encrypter {
  hash(value: string): Promise<string>
  compare(params: EncrypterCompareParams): Promise<boolean>
}

export { Encrypter, EncrypterCompareParams }
