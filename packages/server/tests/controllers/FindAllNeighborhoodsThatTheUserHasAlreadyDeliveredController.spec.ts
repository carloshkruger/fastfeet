import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController } from '@controllers/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController'
import { UniqueEntityId } from '@core/domain'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseTestFactory } from '@tests/factories/useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseTestFactory'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase } from '@useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDelivered/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase'

let findAllNeighborhoodsThatTheUserHasAlreadyDeliveredController: FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController
let findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase: FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase

describe('FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController', () => {
  beforeEach(() => {
    const objects = FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCaseTestFactory.create()

    findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase =
      objects.findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase

    findAllNeighborhoodsThatTheUserHasAlreadyDeliveredController = new FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController(
      findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase
    )
  })

  it('should return 200 on success', async () => {
    const response = await findAllNeighborhoodsThatTheUserHasAlreadyDeliveredController.handle(
      {
        loggedUserId: new UniqueEntityId().value,
        neighborhood: ''
      }
    )

    expect(response.statusCode).toBe(200)
  })

  it('should return 500 if useCase throws', async () => {
    jest
      .spyOn(
        findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase,
        'execute'
      )
      .mockImplementation(async () => {
        throw new Error()
      })

    const response = await findAllNeighborhoodsThatTheUserHasAlreadyDeliveredController.handle(
      {
        loggedUserId: new UniqueEntityId().value,
        neighborhood: ''
      }
    )

    expect(response.statusCode).toBe(500)
  })
})