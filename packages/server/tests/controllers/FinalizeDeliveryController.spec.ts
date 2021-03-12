import { FinalizeDeliveryController } from '@controllers/FinalizeDeliveryController'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { FinalizeDeliveryUseCaseTestFactory } from '@tests/factories/useCases/FinalizeDeliveryUseCaseTestFactory'

const { finalizeDeliveryUseCase } = FinalizeDeliveryUseCaseTestFactory.create()

const finalizeDeliveryController = new FinalizeDeliveryController(
  finalizeDeliveryUseCase
)

const delivery = DeliveryTestFactory.create()
const user = UserTestFactory.create()

describe('FinalizeDeliveryController', () => {
  it('should return 204 if delivery is successfully finalized', async () => {
    jest
      .spyOn(finalizeDeliveryUseCase, 'execute')
      .mockImplementation(async () => undefined)

    const response = await finalizeDeliveryController.handle({
      deliveryId: delivery.id.value,
      loggedUserId: user.id.value,
      signatureImage: ''
    })

    expect(response.statusCode).toBe(204)
  })

  it('should return 500 if use case throws', async () => {
    jest
      .spyOn(finalizeDeliveryUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    const response = await finalizeDeliveryController.handle({
      deliveryId: delivery.id.value,
      loggedUserId: user.id.value,
      signatureImage: ''
    })

    expect(response.statusCode).toBe(500)
  })
})
