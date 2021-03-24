import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { CPF } from '@domain/CPF'
import { Delivery } from '@domain/Delivery'
import { Email } from '@domain/Email'
import { Password } from '@domain/Password'
import { User } from '@domain/User'
import { UserName } from '@domain/UserName'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { ListDeliveriesAlreadyMadeByTheUserUseCase } from '@useCases/ListDeliveriesAlreadyMadeByTheUser/ListDeliveriesAlreadyMadeByTheUserUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let listDeliveriesAlreadyMadeByTheUserUseCase: ListDeliveriesAlreadyMadeByTheUserUseCase

describe('ListDeliveriesAlreadyMadeByTheUserUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    listDeliveriesAlreadyMadeByTheUserUseCase = new ListDeliveriesAlreadyMadeByTheUserUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )
  })

  it('should return a list of deliveries already made by a specific delivery man', async () => {
    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: 'valid_password', hashedValue: '' }),
      cpf: CPF.create({ value: '39782449008' })
    })

    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const delivery = DeliveryTestFactory.createWithGivenUser(user)

    const canceledDelivery = DeliveryTestFactory.createWithGivenUser(user)
    canceledDelivery.defineCanceledAtAsNow()

    const finishedDelivery = DeliveryTestFactory.createWithGivenUser(user)
    finishedDelivery.defineStartDateAsNow()
    finishedDelivery.defineEndDateAsNow()

    jest
      .spyOn(inMemoryDeliveryRepository, 'listDeliveriesAlreadyMadeByUserId')
      .mockImplementation(async () => [
        delivery,
        canceledDelivery,
        finishedDelivery
      ])

    const response = await listDeliveriesAlreadyMadeByTheUserUseCase.execute({
      deliveryManId: user.id.value
    })

    expect(response).toHaveProperty('deliveries')
    expect(response.deliveries).toHaveLength(1)
    expect(response.deliveries[0]).toBeInstanceOf(Delivery)
    expect(response.deliveries[0].isCanceled()).toBe(false)
    expect(response.deliveries[0].isFinished()).toBe(true)
  })

  it('should throw if delivery man id was not provided', async () => {
    await expect(
      listDeliveriesAlreadyMadeByTheUserUseCase.execute({
        deliveryManId: ''
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery man id'))
  })

  it('should throw if delivery man was not found', async () => {
    await expect(
      listDeliveriesAlreadyMadeByTheUserUseCase.execute({
        deliveryManId: new UniqueEntityId().value
      })
    ).rejects.toThrow()
  })
})
