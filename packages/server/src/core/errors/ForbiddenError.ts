import { AppError } from './AppError'

class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message)
    this.name = ForbiddenError.name

    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}

export { ForbiddenError }
