import { AppError } from './AppError'

class FieldRequiredError extends AppError {
  constructor(fieldName: string) {
    super(`${fieldName} is required.`)
    this.name = FieldRequiredError.name
  }
}

export { FieldRequiredError }
