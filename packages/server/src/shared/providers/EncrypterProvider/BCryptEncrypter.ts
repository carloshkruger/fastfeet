import { Encrypter, EncrypterCompareParams } from './Encrypter'
import bcrypt from 'bcrypt'

class BCryptEncrypter implements Encrypter {
  constructor(private salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)

    return hashedValue
  }

  async compare({
    plainTextValue,
    encryptedValue
  }: EncrypterCompareParams): Promise<boolean> {
    const match = await bcrypt.compare(plainTextValue, encryptedValue)

    return match
  }
}

export { BCryptEncrypter }
