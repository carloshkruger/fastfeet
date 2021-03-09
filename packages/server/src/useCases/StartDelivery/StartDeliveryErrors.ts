import { AppError } from '../../core/errors/AppError'

export namespace StartDeliveryErrors {
  export class TimeNotAllowed extends Error implements AppError {
    constructor() {
      super(`Time not allowed for order pickup.`)
    }
  }

  export class DeliveryNotLinkedToUser extends Error implements AppError {
    constructor() {
      super(`Delivery not linked to the user.`)
    }
  }

  export class MaxDeliveriesReached extends Error implements AppError {
    constructor() {
      super(`Max number of deliveries per day reached.`)
    }
  }
}
