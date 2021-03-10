import { AppError } from '../../core/errors/AppError'

class InvalidCPFError extends AppError {
  constructor(cpf: string) {
    super(`The CPF "${cpf}" is invalid.`)
    this.name = InvalidCPFError.name
  }
}

export { InvalidCPFError }
