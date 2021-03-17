import { AppError } from './AppError'

class ConflictError extends AppError {
  constructor(message: string) {
    super(message)
    this.name = ConflictError.name

    Object.setPrototypeOf(this, ConflictError.prototype)
  }
}

export { ConflictError }
