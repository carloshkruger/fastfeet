import { UpdateDeliveryController } from '@controllers/UpdateDeliveryController'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { UpdateDeliveryUseCaseTestFactory } from '@tests/factories/useCases/UpdateDeliveryUseCaseTestFactory'
import { UpdateDeliveryUseCase } from '@useCases/UpdateDelivery/UpdateDeliveryUseCase'

let updateDeliveryUseCase: UpdateDeliveryUseCase
let updateDeliveryController: UpdateDeliveryController

describe('UpdateDeliveryController', () => {
  beforeEach(() => {
    const objects = UpdateDeliveryUseCaseTestFactory.create()

    updateDeliveryUseCase = objects.updateDeliveryUseCase

    updateDeliveryController = new UpdateDeliveryController(
      updateDeliveryUseCase
    )
  })

  it('should return 204 if delivery is successfully updated', async () => {
    const delivery = DeliveryTestFactory.create()
    const user = UserTestFactory.create()

    jest
      .spyOn(updateDeliveryUseCase, 'execute')
      .mockImplementation(async () => undefined)

    const response = await updateDeliveryController.handle({
      data: {
        deliveryId: delivery.id.value,
        loggedUserId: user.id.value,
        recipientName: delivery.recipientName.value,
        productName: delivery.productName.value,
        address: delivery.address.address,
        city: delivery.address.city,
        complement: delivery.address.complement,
        neighborhood: delivery.address.neighborhood,
        number: delivery.address.number,
        postalCode: delivery.address.postalCode.value,
        state: delivery.address.state
      }
    })

    expect(response.statusCode).toBe(204)
  })

  it('should throw if use case throws', async () => {
    const delivery = DeliveryTestFactory.create()
    const user = UserTestFactory.create()

    jest
      .spyOn(updateDeliveryUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    await expect(
      updateDeliveryController.handle({
        data: {
          deliveryId: delivery.id.value,
          loggedUserId: user.id.value,
          recipientName: delivery.recipientName.value,
          productName: delivery.productName.value,
          address: delivery.address.address,
          city: delivery.address.city,
          complement: delivery.address.complement,
          neighborhood: delivery.address.neighborhood,
          number: delivery.address.number,
          postalCode: delivery.address.postalCode.value,
          state: delivery.address.state
        }
      })
    ).rejects.toThrow()
  })
})
