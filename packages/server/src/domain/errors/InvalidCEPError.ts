import { AppError } from '../../core/errors/AppError'

class InvalidCEPError extends Error implements AppError {
  constructor(cep: string) {
    super(`The CEP "${cep}" is invalid.`)
    this.name = InvalidCEPError.name
  }
}

export { InvalidCEPError }
