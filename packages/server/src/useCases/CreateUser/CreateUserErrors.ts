import { AppError } from '@core/errors/AppError'
import { ConflictError } from '@core/errors/ConflictError'

namespace CreateUserErrors {
  export class EmailAlreadyRegistered extends ConflictError {
    constructor(email: string) {
      super(`The email "${email}" is already registered.`)
      this.name = EmailAlreadyRegistered.name
    }
  }

  export class CPFAlreadyRegistered extends ConflictError {
    constructor(cpf: string) {
      super(`The CPF "${cpf}" is already registered.`)
      this.name = CPFAlreadyRegistered.name
    }
  }

  export class PasswordNotMatch extends AppError {
    constructor() {
      super('The password and password confirmation does not match.')
      this.name = PasswordNotMatch.name
    }
  }
}

export { CreateUserErrors }
