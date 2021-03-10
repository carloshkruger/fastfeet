import { AppError } from '../../core/errors/AppError'

class InvalidUserNameError extends AppError {
  constructor() {
    super(`The user name is invalid.`)
    this.name = InvalidUserNameError.name
  }
}

export { InvalidUserNameError }
