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

    const spy = jest.spyOn(finalizeDeliveryUseCase, 'execute')

    const response = await finalizeDeliveryController.handle({
      data: {
        deliveryId: delivery.id.value
      },
      loggedUserId: user.id.value,
      files: [
        {
          filename: 'filename.png'
        }
      ]
    })

    expect(response.statusCode).toBe(204)
    expect(spy).toHaveBeenCalledWith({
      deliveryId: delivery.id.value,
      deliveryManId: user.id.value,
      signatureImage: 'filename.png'
    })
  })

  it('should call use case with empty string for deliveryManId if loggedUserId is not informed', async () => {
    jest
      .spyOn(finalizeDeliveryUseCase, 'execute')
      .mockImplementation(async () => undefined)

    const spy = jest.spyOn(finalizeDeliveryUseCase, 'execute')

    const response = await finalizeDeliveryController.handle({
      data: {
        deliveryId: delivery.id.value
      },
      files: [
        {
          filename: 'filename.png'
        }
      ]
    })

    expect(response.statusCode).toBe(204)
    expect(spy).toHaveBeenCalledWith({
      deliveryId: delivery.id.value,
      deliveryManId: '',
      signatureImage: 'filename.png'
    })
  })

  it('should call use case with empty string for signatureImage if files is not informed', async () => {
    const spy = jest.spyOn(finalizeDeliveryUseCase, 'execute')

    await finalizeDeliveryController.handle({
      data: {
        deliveryId: delivery.id.value
      },
      loggedUserId: user.id.value
    })

    expect(spy).toHaveBeenCalledWith({
      deliveryId: delivery.id.value,
      deliveryManId: user.id.value,
      signatureImage: ''
    })
  })

  it('should call use case with empty string for signatureImage if files is an empty array', async () => {
    const spy = jest.spyOn(finalizeDeliveryUseCase, 'execute')

    await finalizeDeliveryController.handle({
      data: {
        deliveryId: delivery.id.value
      },
      loggedUserId: user.id.value,
      files: []
    })

    expect(spy).toHaveBeenCalledWith({
      deliveryId: delivery.id.value,
      deliveryManId: user.id.value,
      signatureImage: ''
    })
  })

  it('should throw if use case throws', async () => {
    jest
      .spyOn(finalizeDeliveryUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    expect(
      finalizeDeliveryController.handle({
        data: {
          deliveryId: delivery.id.value
        },
        loggedUserId: user.id.value
      })
    ).rejects.toThrow()
  })
})
