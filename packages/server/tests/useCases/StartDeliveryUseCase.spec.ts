import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { Delivery } from '@domain/Delivery'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { getRandomIntegerInRange } from '@shared/utils/getRandomIntegerInRange'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { StartDeliveryErrors } from '@useCases/StartDelivery/StartDeliveryErrors'
import { StartDeliveryUseCase } from '@useCases/StartDelivery/StartDeliveryUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let startDeliveryUseCase: StartDeliveryUseCase

let allowedHourToStartTheDelivery: number

const user = UserTestFactory.create()
const delivery = DeliveryTestFactory.createWithGivenUser(user)

describe('StartDeliveryUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    startDeliveryUseCase = new StartDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )

    allowedHourToStartTheDelivery = getRandomIntegerInRange(
      StartDeliveryUseCase.MIN_HOUR_ALLOWED_TO_START_DELIVERY,
      StartDeliveryUseCase.MAX_HOUR_ALLOWED_TO_START_DELIVERY
    )
  })

  it('should be possible to the user start a delivery', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    jest
      .spyOn(Date.prototype, 'getHours')
      .mockImplementation(() => allowedHourToStartTheDelivery)

    await startDeliveryUseCase.execute({
      deliveryId: delivery.id.value,
      deliveryManId: user.id.value
    })

    const paramPassedToSaveMethod: Delivery = saveSpy.mock.calls[0][0]

    expect(saveSpy).toHaveBeenCalledTimes(1)
    expect(paramPassedToSaveMethod.startDate).toBeInstanceOf(Date)
  })

  it('should not be possible to the user start a delivery outside the allowed hours', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    const hourNotAllowedToStartTheDelivery =
      StartDeliveryUseCase.MIN_HOUR_ALLOWED_TO_START_DELIVERY - 1

    jest
      .spyOn(Date.prototype, 'getHours')
      .mockImplementation(() => hourNotAllowedToStartTheDelivery)

    await expect(
      startDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new StartDeliveryErrors.TimeNotAllowed())

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not be possible to the user start a delivery that is not linked to him', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryNotLinkedToTheUser = DeliveryTestFactory.create()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryNotLinkedToTheUser)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    jest
      .spyOn(Date.prototype, 'getHours')
      .mockImplementation(() => allowedHourToStartTheDelivery)

    await expect(
      startDeliveryUseCase.execute({
        deliveryId: deliveryNotLinkedToTheUser.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new StartDeliveryErrors.DeliveryNotLinkedToUser())

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not be possible to the user start more deliveries than allowed', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    jest
      .spyOn(Date.prototype, 'getHours')
      .mockImplementation(() => allowedHourToStartTheDelivery)

    const moreDeliveriesThanAllowed: Delivery[] = []

    for (
      let i = 0;
      i <= StartDeliveryUseCase.MAX_DELIVERIES_PER_USER_PER_DAY;
      i++
    ) {
      moreDeliveriesThanAllowed.push(delivery)
    }

    jest
      .spyOn(inMemoryDeliveryRepository, 'findByUserIdAndStartDeliveryDate')
      .mockImplementation(async () => moreDeliveriesThanAllowed)

    await expect(
      startDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new StartDeliveryErrors.MaxDeliveriesReached())

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should throw if no deliveryManId is provided', async () => {
    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      startDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: ''
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery man id'))

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should throw if no deliveryId is provided', async () => {
    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      startDeliveryUseCase.execute({
        deliveryId: '',
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery id'))

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should throw if delivery man was not found', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => undefined)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    jest
      .spyOn(Date.prototype, 'getHours')
      .mockImplementation(() => allowedHourToStartTheDelivery)

    await expect(
      startDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: new UniqueEntityId().value
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should throw if delivery was not found', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => undefined)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    jest
      .spyOn(Date.prototype, 'getHours')
      .mockImplementation(() => allowedHourToStartTheDelivery)

    await expect(
      startDeliveryUseCase.execute({
        deliveryId: new UniqueEntityId().value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })
})
