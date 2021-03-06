import { ValueObject } from '@core/domain/ValueObject'
import { InvalidPasswordLengthError } from '@domain/errors/InvalidPasswordLengthError'

interface PasswordProps {
  value: string
  hashedValue: string
}

class Password extends ValueObject<PasswordProps> {
  public static MIN_LENGTH = 6

  private constructor(props: PasswordProps) {
    super(props)
  }

  public static create(props: PasswordProps): Password {
    props.value = props.value.trim()

    const textLength = props.value.length

    if (textLength < Password.MIN_LENGTH) {
      throw new InvalidPasswordLengthError(Password.MIN_LENGTH)
    }

    return new Password(props)
  }

  public static createWithValidatedValue(hashedValue: string): Password {
    return new Password({
      value: '',
      hashedValue
    })
  }

  get plainTextPassword(): string {
    return this.props.value
  }

  get value(): string {
    return this.props.hashedValue
  }
}

export { Password }
