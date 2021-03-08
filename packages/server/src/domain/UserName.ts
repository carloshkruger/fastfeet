import { ValueObject } from '../core/domain/ValueObject'
import { InvalidUserNameError } from './errors/InvalidUserNameError'

interface UserNameProps {
  value: string
}

class UserName extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props)
  }

  public static create(props: UserNameProps): UserName {
    props.value = props.value.trim()

    if (!props.value) {
      throw new InvalidUserNameError()
    }

    return new UserName(props)
  }

  get value(): string {
    return this.props.value
  }
}

export { UserName }
