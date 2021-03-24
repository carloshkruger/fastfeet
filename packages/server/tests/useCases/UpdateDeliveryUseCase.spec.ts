import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { UpdateDeliveryErrors } from '@useCases/UpdateDelivery/UpdateDeliveryErrors'
import { UpdateDeliveryUseCase } from '@useCases/UpdateDelivery/UpdateDeliveryUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let updateDeliveryUseCase: UpdateDeliveryUseCase

const user = UserTestFactory.create()
const delivery = DeliveryTestFactory.createWithGivenUser(user)

const validDeliveryProps = {
  recipientName: 'valid recipient name',
  productName: 'valid product name',
  address: 'valid address',
  postalCode: '89186000',
  complement: '',
  number: 9999,
  neighborhood: 'valid neighborhood',
  city: 'valid city',
  state: 'valid state'
}

describe('UpdateDeliveryUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    updateDeliveryUseCase = new UpdateDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )
  })

  it('should throw if no delivery id is provided', async () => {
    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: '',
        deliveryManId: new UniqueEntityId().value
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery id'))
  })

  it('should throw if no delivery man id is provided', async () => {
    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: new UniqueEntityId().value,
        deliveryManId: ''
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery man id'))
  })

  it('should throw if delivery was not found', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => undefined)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: new UniqueEntityId().value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow()
  })

  it('should throw if delivery man was not found', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => undefined)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: delivery.id.value,
        deliveryManId: new UniqueEntityId().value
      })
    ).rejects.toThrow()
  })

  it('should not be possible to update a delivery already initialized', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryAlreadyInitialized = DeliveryTestFactory.createWithGivenUser(
      user
    )
    deliveryAlreadyInitialized.defineStartDateAsNow()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryAlreadyInitialized)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: deliveryAlreadyInitialized.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new UpdateDeliveryErrors.DeliveryAlreadyInitialized())
  })

  it('should not be possible to update a delivery already finished', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryAlreadyFinished = DeliveryTestFactory.createWithGivenUser(
      user
    )
    deliveryAlreadyFinished.defineStartDateAsNow()
    deliveryAlreadyFinished.defineEndDateAsNow()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryAlreadyFinished)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: deliveryAlreadyFinished.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new UpdateDeliveryErrors.DeliveryAlreadyFinished())
  })

  it('should not be possible to update a delivery canceled', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryCanceled = DeliveryTestFactory.createWithGivenUser(user)
    deliveryCanceled.defineCanceledAtAsNow()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryCanceled)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: deliveryCanceled.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new UpdateDeliveryErrors.DeliveryCanceled())
  })

  it('should update a delivery', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: delivery.id.value,
        deliveryManId: delivery.id.value
      })
    ).resolves.not.toThrow()

    expect(saveSpy).toHaveBeenCalledTimes(1)
  })
})
