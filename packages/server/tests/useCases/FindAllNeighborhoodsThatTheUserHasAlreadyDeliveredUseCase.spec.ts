import { UniqueEntityId } from '@core/domain'
import { FieldRequiredError } from '@core/errors'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase } from '@useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDelivered/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase'

let inMemoryDeliveryRepository: DeliveryRepository
let findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase: FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase

describe('FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase = new FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase(
      inMemoryDeliveryRepository
    )
  })

  it('should throw if userId is not provided', async () => {
    await expect(
      findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase.execute({
        userId: '',
        neighborhood: 'some valid value'
      })
    ).rejects.toThrow(new FieldRequiredError('User id'))
  })

  it('should return a list of addresses', async () => {
    const spy = jest.spyOn(
      inMemoryDeliveryRepository,
      'findAllNeighborhoodsLinkedToDeliveryMan'
    )

    const response = await findAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase.execute(
      { userId: new UniqueEntityId().value, neighborhood: 'some valid value' }
    )

    expect(response).toHaveProperty('neighborhoods')
    expect(response.neighborhoods).toBeTruthy()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
