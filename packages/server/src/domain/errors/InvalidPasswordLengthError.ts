import { AppError } from '../../core/errors/AppError'

class InvalidPasswordLengthError extends Error implements AppError {
  constructor(minLength: number) {
    super(`The password must contain at least ${minLength} characters.`)
    this.name = InvalidPasswordLengthError.name
  }
}

export { InvalidPasswordLengthError }
