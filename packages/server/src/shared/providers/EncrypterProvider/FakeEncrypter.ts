import { Encrypter, EncrypterCompareParams } from './Encrypter'

class FakeEncrypter implements Encrypter {
  async hash(value: string): Promise<string> {
    return `${value}some_extra_text`
  }

  async compare({
    plainTextValue,
    encryptedValue
  }: EncrypterCompareParams): Promise<boolean> {
    const hash = await this.hash(plainTextValue)

    return hash === encryptedValue
  }
}

export { FakeEncrypter }
