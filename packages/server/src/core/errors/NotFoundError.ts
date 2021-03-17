import { AppError } from './AppError'

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message)
    this.name = NotFoundError.name

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export { NotFoundError }
