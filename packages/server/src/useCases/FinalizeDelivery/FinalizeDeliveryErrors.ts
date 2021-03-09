import { AppError } from '../../core/errors/AppError'

export namespace FinalizeDeliveryErrors {
  export class DeliveryNotLinkedToUser extends Error implements AppError {
    constructor() {
      super(`Delivery not linked to the user.`)
    }
  }

  export class DeliveryNotInitialized extends Error implements AppError {
    constructor() {
      super(`Delivery not initialized.`)
    }
  }
}
