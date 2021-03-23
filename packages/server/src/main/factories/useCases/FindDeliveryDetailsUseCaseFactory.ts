import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { FindDeliveryDetailsUseCase } from '@useCases/FindDeliveryDetails/FindDeliveryDetailsUseCase'

class FindDeliveryDetailsUseCaseFactory {
  static create(): FindDeliveryDetailsUseCase {
    const typeormDeliveryRepository = new TypeOrmDeliveryRepository()

    return new FindDeliveryDetailsUseCase(typeormDeliveryRepository)
  }
}

export { FindDeliveryDetailsUseCaseFactory }
