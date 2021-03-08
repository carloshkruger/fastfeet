import { ValueObject } from '../core/domain/ValueObject'
import { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError'

interface PasswordProps {
  value: string
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

  get value(): string {
    return this.props.value
  }
}

export { Password }
