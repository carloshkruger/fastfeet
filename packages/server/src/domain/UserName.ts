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
    if (isEmpty(props.value)) {
      throw new FieldRequiredError('Username')
    }

    props.value = props.value.trim()

    return new UserName(props)
  }

  get value(): string {
    return this.props.value
  }
}

export { UserName }
