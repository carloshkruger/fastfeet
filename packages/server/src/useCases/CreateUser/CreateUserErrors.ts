import { AppError } from '../../core/errors/AppError'

namespace CreateUserErrors {
  export class EmailAlreadyRegistered extends Error implements AppError {
    constructor(email: string) {
      super(`The email "${email}" is already registered.`)
      this.name = EmailAlreadyRegistered.name
    }
  }
}

export { CreateUserErrors }
