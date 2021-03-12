import { ValueObject } from '@core/domain'
import { FieldRequiredError } from '@core/errors'
import { isEmpty } from '@shared/utils/String'
import { CEP } from './CEP'

interface AddressProps {
  postalCode: CEP
  number: number
  address: string
  neighborhood: string
  city: string
  state: string
  complement?: string
}

class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) {
    super(props)
  }

  public static create(props: AddressProps): Address {
    if (isEmpty(props.address)) {
      throw new FieldRequiredError('Address')
    }

    if (!props.number) {
      throw new FieldRequiredError('Number')
    }

    if (isEmpty(props.neighborhood)) {
      throw new FieldRequiredError('Neighborhood')
    }

    if (isEmpty(props.city)) {
      throw new FieldRequiredError('City')
    }

    if (isEmpty(props.state)) {
      throw new FieldRequiredError('State')
    }

    return new Address(props)
  }

  get postalCode(): CEP {
    return this.props.postalCode
  }

  get number(): number {
    return this.props.number
  }

  get address(): string {
    return this.props.address
  }

  get neighborhood(): string {
    return this.props.neighborhood
  }

  get city(): string {
    return this.props.city
  }

  get state(): string {
    return this.props.state
  }

  get complement(): string {
    return this.props.complement || ''
  }
}

export { Address }
