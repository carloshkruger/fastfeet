import { AppError } from '../../core/errors/AppError'

export namespace UpdateDeliveryErrors {
  export class DeliveryAlreadyInitialized extends Error implements AppError {
    constructor() {
      super('Delivery is already initialized.')
    }
  }

  export class DeliveryAlreadyFinished extends Error implements AppError {
    constructor() {
      super('Delivery is already finished.')
    }
  }

  export class DeliveryCanceled extends Error implements AppError {
    constructor() {
      super('Delivery is canceled.')
    }
  }
}
