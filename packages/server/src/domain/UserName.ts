import { ValueObject } from '@core/domain'
import { FieldRequiredError } from '@core/errors'
import { isEmpty } from '@shared/utils/String'

interface UserNameProps {
  value: string
}

class UserName extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props)
  }

  public static create(props: UserNameProps): UserName {
    props.value = props.value.trim()

    if (isEmpty(props.value)) {
      throw new FieldRequiredError('Username')
    }

    return new UserName(props)
  }

  get value(): string {
    return this.props.value
  }
}

export { UserName }
