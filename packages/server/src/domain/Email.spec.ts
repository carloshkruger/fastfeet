import { Email } from './Email'
import { InvalidEmailError } from './errors/InvalidEmailError'

describe('Email validation', () => {
  it('should not create a instance of Email with an invalid email (with only username)', () => {
    const invalidEmail = 'invalid_email'
    expect(() => Email.create({ value: invalidEmail })).toThrow(
      InvalidEmailError
    )
  })

  it('should not create a instance of Email with an invalid email (without domain name)', () => {
    const invalidEmail = 'invalid_email@'
    expect(() => Email.create({ value: invalidEmail })).toThrow(
      InvalidEmailError
    )
  })

  it('should not create a instance of Email with an invalid email (with incorrect domain name)', () => {
    const invalidEmail = 'invalid_email@domain'
    expect(() => Email.create({ value: invalidEmail })).toThrow(
      InvalidEmailError
    )

    const invalidEmail2 = 'invalid_email@domain.'
    expect(() => Email.create({ value: invalidEmail2 })).toThrow(
      InvalidEmailError
    )

    const invalidEmail3 = 'invalid_email@domain.com.'
    expect(() => Email.create({ value: invalidEmail3 })).toThrow(
      InvalidEmailError
    )
  })

  it('should not create a instance of Email with an invalid email (without username)', () => {
    const invalidEmail = '@domain.com'
    expect(() => Email.create({ value: invalidEmail })).toThrow(
      InvalidEmailError
    )
  })

  it('should create a instance of Email with valid email', () => {
    const validEmail = 'valid_email@domain.com'
    expect(Email.create({ value: validEmail })).toBeInstanceOf(Email)

    const validEmail2 = 'valid_email@domain.com.br'
    expect(Email.create({ value: validEmail2 })).toBeInstanceOf(Email)
  })
})
