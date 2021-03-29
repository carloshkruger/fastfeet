import { FindDeliveryDetailsController } from '@controllers/FindDeliveryDetailsController'
import { FindDeliveryDetailsPresenter } from '@presenters/FindDeliveryDetailsPresenter'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { FindDeliveryDetailsUseCaseTestFactory } from '@tests/factories/useCases/FindDeliveryDetailsUseCaseTestFactory'
import { FindDeliveryDetailsUseCase } from '@useCases/FindDeliveryDetails/FindDeliveryDetailsUseCase'

let findDeliveryDetailsPresenter: FindDeliveryDetailsPresenter
let findDeliveryDetailsUseCase: FindDeliveryDetailsUseCase
let findDeliveryDetailsController: FindDeliveryDetailsController

describe('FindDeliveryDetailsController', () => {
  beforeEach(() => {
    const objects = FindDeliveryDetailsUseCaseTestFactory.create()
    findDeliveryDetailsUseCase = objects.findDeliveryDetailsUseCase

    findDeliveryDetailsPresenter = new FindDeliveryDetailsPresenter()

    findDeliveryDetailsController = new FindDeliveryDetailsController(
      findDeliveryDetailsUseCase,
      findDeliveryDetailsPresenter
    )
  })

  it('should return 200 on success', async () => {
    const delivery = DeliveryTestFactory.create()

    jest
      .spyOn(findDeliveryDetailsUseCase, 'execute')
      .mockImplementation(async () => ({ delivery }))

    const response = await findDeliveryDetailsController.handle({
      data: {
        deliveryId: delivery.id.value
      }
    })

    expect(response.statusCode).toBe(200)
  })

  it('should return 500 if use case throws', async () => {
    const delivery = DeliveryTestFactory.create()

    jest
      .spyOn(findDeliveryDetailsUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    const response = await findDeliveryDetailsController.handle({
      data: {
        deliveryId: delivery.id.value
      }
    })

    expect(response.statusCode).toBe(500)
  })

  it('should return 500 if presenter throws', async () => {
    const delivery = DeliveryTestFactory.create()

    jest
      .spyOn(findDeliveryDetailsUseCase, 'execute')
      .mockImplementation(async () => ({ delivery }))

    jest
      .spyOn(findDeliveryDetailsPresenter, 'transform')
      .mockImplementation(() => {
        throw new Error()
      })

    const response = await findDeliveryDetailsController.handle({
      data: {
        deliveryId: delivery.id.value
      }
    })

    expect(response.statusCode).toBe(500)
  })
})
