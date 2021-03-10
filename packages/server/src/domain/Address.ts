import { ValueObject } from '../core/domain/ValueObject'
import { isEmpty } from '../shared/utils/String'
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
      throw new Error('Address is required.')
    }

    if (!props.number) {
      throw new Error('Number is required.')
    }

    if (!props.postalCode) {
      throw new Error('Postal code is required.')
    }

    if (isEmpty(props.neighborhood)) {
      throw new Error('Neighborhood is required.')
    }

    if (isEmpty(props.city)) {
      throw new Error('City is required.')
    }

    if (isEmpty(props.state)) {
      throw new Error('State is required.')
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
