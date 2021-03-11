import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { DeleteDeliveryUseCase } from '@useCases/DeleteDelivery/DeleteDeliveryUseCase'

interface Response {
  inMemoryDeliveryRepository: DeliveryRepository
  deleteDeliveryUseCase: DeleteDeliveryUseCase
}

class DeleteDeliveryUseCaseTestFactory {
  static create(): Response {
    const inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    const deleteDeliveryUseCase = new DeleteDeliveryUseCase(
      inMemoryDeliveryRepository
    )

    return {
      inMemoryDeliveryRepository,
      deleteDeliveryUseCase
    }
  }
}

export { DeleteDeliveryUseCaseTestFactory }
