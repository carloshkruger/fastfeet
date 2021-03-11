import { ValueObject } from '../core/domain/ValueObject'
import { FieldRequiredError } from '../core/errors/FieldRequiredError'
import { removeNonNumericCharacters } from '../shared/utils/removeNonNumericCharacters'
import { isEmpty } from '../shared/utils/String'
import { InvalidCPFError } from './errors/InvalidCPFError'

interface CPFProps {
  value: string
}

class CPF extends ValueObject<CPFProps> {
  private constructor(props: CPFProps) {
    super(props)
  }

  public static create(props: CPFProps): CPF {
    if (isEmpty(props.value)) {
      throw new FieldRequiredError('CPF')
    }

    props.value = removeNonNumericCharacters(props.value)

    if (!CPF.validate(props.value)) {
      throw new InvalidCPFError(props.value)
    }

    return new CPF(props)
  }

  public static validate(cpf: string): boolean {
    cpf = removeNonNumericCharacters(cpf)

    if (
      !cpf ||
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false
    }

    let soma = 0
    let resto

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11) {
      resto = 0
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false
    }

    soma = 0

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11) {
      resto = 0
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false
    }

    return true
  }

  public get value(): string {
    return this.props.value
  }
}

export { CPF }
