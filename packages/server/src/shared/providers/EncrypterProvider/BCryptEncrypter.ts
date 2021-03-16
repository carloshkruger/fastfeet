import { Encrypter, EncrypterCompareParams } from './Encrypter'
import bcrypt from 'bcrypt'

class BCryptEncrypter implements Encrypter {
  private static SALT = 12

  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, BCryptEncrypter.SALT)

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
