import { AppError } from '@core/errors/AppError'

export namespace UpdateDeliveryErrors {
  export class DeliveryAlreadyInitialized extends AppError {
    constructor() {
      super('Delivery is already initialized.')
      this.name = DeliveryAlreadyInitialized.name
    }
  }

  export class DeliveryAlreadyFinished extends AppError {
    constructor() {
      super('Delivery is already finished.')
      this.name = DeliveryAlreadyFinished.name
    }
  }

  export class DeliveryCanceled extends AppError {
    constructor() {
      super('Delivery is canceled.')
      this.name = DeliveryCanceled.name
    }
  }
}
