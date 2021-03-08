import { AppError } from '../../core/errors/AppError'

class InvalidEmailError extends Error implements AppError {
  constructor(email: string) {
    super(`The email "${email}" is invalid.`)
    this.name = InvalidEmailError.name
  }
}

export { InvalidEmailError }
