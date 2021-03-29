import { DeleteDeliveryController } from '@controllers/DeleteDeliveryController'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { DeleteDeliveryUseCaseTestFactory } from '@tests/factories/useCases/DeleteDeliveryUseCaseTestFactory'
import { DeleteDeliveryUseCase } from '@useCases/DeleteDelivery/DeleteDeliveryUseCase'

let inMemoryDeliveryRepository: DeliveryRepository
let deleteDeliveryUseCase: DeleteDeliveryUseCase
let deleteDeliveryController: DeleteDeliveryController

describe('DeleteDeliveryController', () => {
  beforeEach(() => {
    const objects = DeleteDeliveryUseCaseTestFactory.create()

    deleteDeliveryUseCase = objects.deleteDeliveryUseCase
    inMemoryDeliveryRepository = objects.inMemoryDeliveryRepository

    deleteDeliveryController = new DeleteDeliveryController(
      deleteDeliveryUseCase
    )
  })

  it('should return 204 if delivery is successfully deleted', async () => {
    const delivery = DeliveryTestFactory.create()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const response = await deleteDeliveryController.handle({
      data: {
        deliveryId: delivery.id.value
      }
    })

    expect(response.statusCode).toBe(204)
  })

  it('should throw if UseCase throws', async () => {
    const delivery = DeliveryTestFactory.create()

    jest
      .spyOn(deleteDeliveryUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    await expect(
      deleteDeliveryController.handle({
        data: {
          deliveryId: delivery.id.value
        }
      })
    ).rejects.toThrow()
  })
})
