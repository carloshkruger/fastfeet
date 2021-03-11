import { AppError } from '@core/errors/AppError'

export namespace AuthenticateUserErrors {
  export class IncorrectCredentials extends AppError {
    constructor() {
      super('CPF and/or password does not match.')
      this.name = IncorrectCredentials.name
    }
  }
}
