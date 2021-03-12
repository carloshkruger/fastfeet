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
      loggedUserId: new UniqueEntityId().value
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  it('should return 500 if use case throws', async () => {
    jest
      .spyOn(listDeliveriesAlreadyMadeByTheUserUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    const response = await listDeliveriesAlreadyMadeByTheUserController.handle({
      loggedUserId: new UniqueEntityId().value
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toBeFalsy()
  })

  it('should return 500 if presenter throws', async () => {
    jest
      .spyOn(listDeliveriesAlreadyMadeByTheUserPresenter, 'transform')
      .mockImplementation(() => {
        throw new Error()
      })

    const response = await listDeliveriesAlreadyMadeByTheUserController.handle({
      loggedUserId: new UniqueEntityId().value
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toBeFalsy()
  })
})
