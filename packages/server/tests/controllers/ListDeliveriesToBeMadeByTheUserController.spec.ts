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
      loggedUserId: new UniqueEntityId().value,
      data: {
        neighborhood: ''
      }
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  it('should call use case with empty string for deliveryManId if loggedUserId is not informed', async () => {
    const spy = jest.spyOn(listDeliveriesToBeMadeByTheUserUseCase, 'execute')

    await listDeliveriesToBeMadeByTheUserController.handle({
      data: {}
    })

    expect(spy).toHaveBeenCalledWith({
      deliveryManId: ''
    })
  })

  it('should throw if use case throws', async () => {
    jest
      .spyOn(listDeliveriesToBeMadeByTheUserUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    await expect(
      listDeliveriesToBeMadeByTheUserController.handle({
        loggedUserId: new UniqueEntityId().value,
        data: {
          neighborhood: ''
        }
      })
    ).rejects.toThrow()
  })

  it('should throw if presenter throws', async () => {
    jest
      .spyOn(listDeliveriesToBeMadeByTheUserPresenter, 'transform')
      .mockImplementation(() => {
        throw new Error()
      })

    await expect(
      listDeliveriesToBeMadeByTheUserController.handle({
        loggedUserId: new UniqueEntityId().value,
        data: {
          neighborhood: ''
        }
      })
    ).rejects.toThrow()
  })
})
