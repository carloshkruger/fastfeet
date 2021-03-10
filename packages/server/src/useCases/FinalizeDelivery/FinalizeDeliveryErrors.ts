import { AppError } from '../../core/errors/AppError'

export namespace FinalizeDeliveryErrors {
  export class DeliveryNotLinkedToUser extends AppError {
    constructor() {
      super(`Delivery not linked to the user.`)
      this.name = DeliveryNotLinkedToUser.name
    }
  }

  export class DeliveryNotInitialized extends AppError {
    constructor() {
      super(`Delivery not initialized.`)
      this.name = DeliveryNotInitialized.name
    }
  }
}
