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
      data: {
        deliveryId: delivery.id.value
      },
      loggedUserId: user.id.value
    })

    expect(response.statusCode).toBe(204)
  })

  it('should call use case with empty string for deliveryManId if loggedUserId is not informed', async () => {
    jest
      .spyOn(startDeliveryUseCase, 'execute')
      .mockImplementation(async () => undefined)

    const delivery = DeliveryTestFactory.create()

    const spy = jest.spyOn(startDeliveryUseCase, 'execute')

    await startDeliveryController.handle({
      data: {
        deliveryId: delivery.id.value
      }
    })

    expect(spy).toHaveBeenCalledWith({
      deliveryId: delivery.id.value,
      deliveryManId: ''
    })
  })

  it('should throw if use case throws', async () => {
    const delivery = DeliveryTestFactory.create()
    const user = UserTestFactory.create()

    jest.spyOn(startDeliveryUseCase, 'execute').mockImplementation(async () => {
      throw new Error()
    })

    await expect(
      startDeliveryController.handle({
        data: {
          deliveryId: delivery.id.value
        },
        loggedUserId: user.id.value
      })
    ).rejects.toThrow()
  })
})
