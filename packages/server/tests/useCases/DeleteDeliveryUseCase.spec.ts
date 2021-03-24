import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { DeleteDeliveryUseCase } from '@useCases/DeleteDelivery/DeleteDeliveryUseCase'

let inMemoryDeliveryRepository: DeliveryRepository
let deleteDeliveryUseCase: DeleteDeliveryUseCase

describe('DeleteDeliveryUseCase', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    deleteDeliveryUseCase = new DeleteDeliveryUseCase(
      inMemoryDeliveryRepository
    )
  })

  it('should throw if no delivery id is provided', async () => {
    await expect(
      deleteDeliveryUseCase.execute({
        deliveryId: ''
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery id'))
  })

  it('should throw if delivery was not found', async () => {
    await expect(
      deleteDeliveryUseCase.execute({
        deliveryId: new UniqueEntityId().value
      })
    ).rejects.toThrow()
  })

  it('should delete a delivery', async () => {
    const delivery = DeliveryTestFactory.create()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const deleteByIdSpy = jest.spyOn(inMemoryDeliveryRepository, 'deleteById')

    await expect(
      deleteDeliveryUseCase.execute({
        deliveryId: delivery.id.value
      })
    ).resolves.not.toThrow()

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1)
    expect(deleteByIdSpy).toHaveBeenCalledWith(delivery.id)
  })
})
