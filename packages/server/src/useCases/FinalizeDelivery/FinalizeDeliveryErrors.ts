import { ConflictError, ForbiddenError } from '@core/errors'
import { AppError } from '@core/errors'

export namespace FinalizeDeliveryErrors {
  export class DeliveryNotLinkedToUser extends ForbiddenError {
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

  export class DeliveryAlreadyFinished extends ConflictError {
    constructor() {
      super(`Delivery already finished.`)
      this.name = DeliveryAlreadyFinished.name
    }
  }
}
