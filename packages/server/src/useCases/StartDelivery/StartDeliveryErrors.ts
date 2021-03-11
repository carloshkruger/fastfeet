import { AppError } from '@core/errors/AppError'

export namespace StartDeliveryErrors {
  export class TimeNotAllowed extends AppError {
    constructor() {
      super(`Time not allowed for order pickup.`)
      this.name = TimeNotAllowed.name
    }
  }

  export class DeliveryNotLinkedToUser extends AppError {
    constructor() {
      super(`Delivery not linked to the user.`)
      this.name = DeliveryNotLinkedToUser.name
    }
  }

  export class MaxDeliveriesReached extends AppError {
    constructor() {
      super(`Max number of deliveries per day reached.`)
      this.name = MaxDeliveriesReached.name
    }
  }
}
