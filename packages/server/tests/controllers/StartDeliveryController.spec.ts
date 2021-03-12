import { StartDeliveryController } from '@controllers/StartDeliveryController'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { StartDeliveryUseCaseTestFactory } from '@tests/factories/useCases/StartDeliveryUseCaseTestFactory'
import { StartDeliveryUseCase } from '@useCases/StartDelivery/StartDeliveryUseCase'

let startDeliveryUseCase: StartDeliveryUseCase
let startDeliveryController: StartDeliveryController

describe('StartDeliveryController', () => {
  beforeEach(() => {
    const objects = StartDeliveryUseCaseTestFactory.create()

    startDeliveryUseCase = objects.startDeliveryUseCase

    startDeliveryController = new StartDeliveryController(startDeliveryUseCase)
  })

  it('should return 204 if delivery is successfully started', async () => {
    const delivery = DeliveryTestFactory.create()
    const user = UserTestFactory.create()

    jest
      .spyOn(startDeliveryUseCase, 'execute')
      .mockImplementation(async () => undefined)

    const response = await startDeliveryController.handle({
      deliveryId: delivery.id.value,
      loggedUserId: user.id.value
    })

    expect(response.statusCode).toBe(204)
  })

  it('should return 500 if use case throws', async () => {
    const delivery = DeliveryTestFactory.create()
    const user = UserTestFactory.create()

    jest.spyOn(startDeliveryUseCase, 'execute').mockImplementation(async () => {
      throw new Error()
    })

    const response = await startDeliveryController.handle({
      deliveryId: delivery.id.value,
      loggedUserId: user.id.value
    })

    expect(response.statusCode).toBe(500)
  })
})
