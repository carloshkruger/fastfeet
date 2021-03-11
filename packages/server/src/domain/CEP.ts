import { ValueObject } from '@core/domain'
import { FieldRequiredError } from '@core/errors'
import { removeNonNumericCharacters } from '@shared/utils/removeNonNumericCharacters'
import { isEmpty } from '@shared/utils/String'
import { InvalidCEPError } from '@domain/errors/InvalidCEPError'

interface CEPProps {
  value: string
}

class CEP extends ValueObject<CEPProps> {
  private static LENGTH = 8

  get value(): string {
    return this.props.value
  }

  private constructor(props: CEPProps) {
    super(props)
  }

  public static create(props: CEPProps): CEP {
    const valueWithoutFormatting = props.value

    if (isEmpty(valueWithoutFormatting)) {
      throw new FieldRequiredError('CEP')
    }

    props.value = removeNonNumericCharacters(props.value)

    if (props.value.length !== CEP.LENGTH) {
      throw new InvalidCEPError(valueWithoutFormatting)
    }

    return new CEP(props)
  }

  getFormattedCEP(): string {
    return this.value.replace(/\D/g, '').replace(/(\d{5})(\d{3})$/, '$1-$2')
  }
}

export { CEP }
