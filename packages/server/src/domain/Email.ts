import { ValueObject } from '../core/domain'
import { InvalidEmailError } from '../domain/errors/InvalidEmailError'

interface EmailProps {
  value: string
}

class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props)
  }

  public static create(props: EmailProps): Email {
    if (!Email.validate(props.value)) {
      throw new InvalidEmailError(props.value)
    }

    return new Email(props)
  }

  static validate(email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email || !tester.test(email)) {
      return false
    }

    return true
  }

  get value(): string {
    return this.props.value
  }
}

export { Email }
