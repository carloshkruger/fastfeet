import { ListDeliveriesAlreadyMadeByTheUserController } from '@controllers/ListDeliveriesAlreadyMadeByTheUserController'
import { UniqueEntityId } from '@core/domain'
import { ListDeliveriesAlreadyMadeByTheUserPresenter } from '@presenters/ListDeliveriesAlreadyMadeByTheUserPresenter'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { ListDeliveriesAlreadyMadeByTheUserUseCaseTestFactory } from '@tests/factories/useCases/ListDeliveriesAlreadyMadeByTheUserUseCaseTestFactory'

const {
  listDeliveriesAlreadyMadeByTheUserUseCase
} = ListDeliveriesAlreadyMadeByTheUserUseCaseTestFactory.create()

const listDeliveriesAlreadyMadeByTheUserPresenter = new ListDeliveriesAlreadyMadeByTheUserPresenter()

let listDeliveriesAlreadyMadeByTheUserController = new ListDeliveriesAlreadyMadeByTheUserController(
  listDeliveriesAlreadyMadeByTheUserUseCase,
  listDeliveriesAlreadyMadeByTheUserPresenter
)

describe('ListDeliveriesAlreadyMadeByTheUserController', () => {
  it('should return 200 on success', async () => {
    jest
      .spyOn(listDeliveriesAlreadyMadeByTheUserUseCase, 'execute')
      .mockImplementation(async () => ({
        deliveries: [DeliveryTestFactory.create()]
      }))

    const response = await listDeliveriesAlreadyMadeByTheUserController.handle({
      loggedUserId: new UniqueEntityId().value,
      data: {}
    })

    expect(response.statusCode).toBe(200)
  })

  it('should call use case with empty string for deliveryManId if loggedUserId is not informed', async () => {
    const spy = jest.spyOn(listDeliveriesAlreadyMadeByTheUserUseCase, 'execute')

    await listDeliveriesAlreadyMadeByTheUserController.handle({
      data: {}
    })

    expect(spy).toHaveBeenCalledWith({
      deliveryManId: ''
    })
  })

  it('should throw if use case throws', async () => {
    jest
      .spyOn(listDeliveriesAlreadyMadeByTheUserUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    await expect(
      listDeliveriesAlreadyMadeByTheUserController.handle({
        loggedUserId: new UniqueEntityId().value,
        data: {}
      })
    ).rejects.toThrow()
  })

  it('should throw if presenter throws', async () => {
    jest
      .spyOn(listDeliveriesAlreadyMadeByTheUserPresenter, 'transform')
      .mockImplementation(() => {
        throw new Error()
      })

    await expect(
      listDeliveriesAlreadyMadeByTheUserController.handle({
        loggedUserId: new UniqueEntityId().value,
        data: {}
      })
    ).rejects.toThrow()
  })
})
