import { AppError } from '../../core/errors/AppError'

namespace CreateUserErrors {
  export class EmailAlreadyRegistered extends AppError {
    constructor(email: string) {
      super(`The email "${email}" is already registered.`)
      this.name = EmailAlreadyRegistered.name
    }
  }

  export class CPFAlreadyRegistered extends AppError {
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
