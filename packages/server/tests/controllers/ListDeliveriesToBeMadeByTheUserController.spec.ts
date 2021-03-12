import { ListDeliveriesToBeMadeByTheUserController } from '@controllers/ListDeliveriesToBeMadeByTheUserController'
import { UniqueEntityId } from '@core/domain'
import { ListDeliveriesToBeMadeByTheUserPresenter } from '@presenters/ListDeliveriesToBeMadeByTheUserPresenter'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { ListDeliveriesToBeMadeByTheUserUseCaseTestFactory } from '@tests/factories/useCases/ListDeliveriesToBeMadeByTheUserUseCaseTestFactory'

const {
  listDeliveriesToBeMadeByTheUserUseCase
} = ListDeliveriesToBeMadeByTheUserUseCaseTestFactory.create()

let listDeliveriesToBeMadeByTheUserPresenter = new ListDeliveriesToBeMadeByTheUserPresenter()

let listDeliveriesToBeMadeByTheUserController = new ListDeliveriesToBeMadeByTheUserController(
  listDeliveriesToBeMadeByTheUserUseCase,
  listDeliveriesToBeMadeByTheUserPresenter
)

describe('ListDeliveriesToBeMadeByTheUserController', () => {
  it('should return 200 on success', async () => {
    jest
      .spyOn(listDeliveriesToBeMadeByTheUserUseCase, 'execute')
      .mockImplementation(async () => {
        return {
          deliveries: [DeliveryTestFactory.create()]
        }
      })

    const response = await listDeliveriesToBeMadeByTheUserController.handle({
      loggedUserId: new UniqueEntityId().value
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  it('should return 500 if use case throws', async () => {
    jest
      .spyOn(listDeliveriesToBeMadeByTheUserUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    const response = await listDeliveriesToBeMadeByTheUserController.handle({
      loggedUserId: new UniqueEntityId().value
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toBeFalsy()
  })

  it('should return 500 if presenter throws', async () => {
    jest
      .spyOn(listDeliveriesToBeMadeByTheUserPresenter, 'transform')
      .mockImplementation(() => {
        throw new Error()
      })

    const response = await listDeliveriesToBeMadeByTheUserController.handle({
      loggedUserId: new UniqueEntityId().value
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toBeFalsy()
  })
})
