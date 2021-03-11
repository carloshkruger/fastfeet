import { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError'
import { Password } from './Password'

describe('Password validation', () => {
  it('should not create a Password instance with incorrect value (fewer characters than allowed)', () => {
    const minLengthAllowed = Password.MIN_LENGTH
    let text = ''

    for (let i = 0; i < minLengthAllowed - 1; i++) {
      text += 'a'
    }

    expect(() => Password.create({ value: text, hashedValue: '' })).toThrow(
      InvalidPasswordLengthError
    )
  })

  it('should not create a Password instance with incorrect value (with only blank spaces)', () => {
    const minLengthAllowed = Password.MIN_LENGTH
    let text = ''

    for (let i = 0; i < minLengthAllowed; i++) {
      text += ' '
    }

    expect(() => Password.create({ value: text, hashedValue: '' })).toThrow(
      InvalidPasswordLengthError
    )
  })

  it('should create a Password instance with correct values', () => {
    const minLengthAllowed = Password.MIN_LENGTH
    let text = ''

    for (let i = 0; i < minLengthAllowed; i++) {
      text += 'a'
    }

    const hashedValue = ''

    const password = Password.create({ value: text, hashedValue })

    expect(password).toBeInstanceOf(Password)
    expect(password.value).toBe(hashedValue)
  })

  it('should create a Password instance with correct values using "createWithValidatedValue" method', () => {
    const hashedValue = ''

    const password = Password.createWithValidatedValue(hashedValue)

    expect(password).toBeInstanceOf(Password)
    expect(password.value).toBe(hashedValue)
  })
})
