import { UniqueEntityId } from '@core/domain'
import { FieldRequiredError, NotFoundError } from '@core/errors'
import { Delivery } from '@domain/Delivery'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { FindDeliveryDetailsUseCase } from '@useCases/FindDeliveryDetails/FindDeliveryDetailsUseCase'

let inMemoryDeliveryRepository: DeliveryRepository
let findDeliveryDetailsUseCase: FindDeliveryDetailsUseCase

describe('FindDeliveryDetailsUseCase', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    findDeliveryDetailsUseCase = new FindDeliveryDetailsUseCase(
      inMemoryDeliveryRepository
    )
  })

  it('should throw if no delivery id is provided', async () => {
    await expect(
      findDeliveryDetailsUseCase.execute({
        deliveryId: ''
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery id'))
  })

  it('should throw if delivery is not found', async () => {
    await expect(
      findDeliveryDetailsUseCase.execute({
        deliveryId: new UniqueEntityId().value
      })
    ).rejects.toThrow(new NotFoundError('Delivery not found.'))
  })

  it('should return a delivery', async () => {
    const delivery = DeliveryTestFactory.create()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const response = await findDeliveryDetailsUseCase.execute({
      deliveryId: delivery.id.value
    })

    expect(response.delivery).toBeInstanceOf(Delivery)
  })
})
