import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { DeleteDeliveryUseCase } from '@useCases/DeleteDelivery/DeleteDeliveryUseCase'

class DeleteDeliveryUseCaseFactory {
  static create(): DeleteDeliveryUseCase {
    const deliveryRepository = new TypeOrmDeliveryRepository()

    return new DeleteDeliveryUseCase(deliveryRepository)
  }
}

export { DeleteDeliveryUseCaseFactory }
