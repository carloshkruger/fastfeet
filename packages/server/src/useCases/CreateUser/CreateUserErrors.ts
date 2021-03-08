import { AppError } from '../../core/errors/AppError'

namespace CreateUserErrors {
  export class EmailAlreadyRegistered extends Error implements AppError {
    constructor(email: string) {
      super(`The email "${email}" is already registered.`)
      this.name = EmailAlreadyRegistered.name
    }
  }

  export class CPFAlreadyRegistered extends Error implements AppError {
    constructor(cpf: string) {
      super(`The CPF "${cpf}" is already registered.`)
      this.name = CPFAlreadyRegistered.name
    }
  }
}

export { CreateUserErrors }
