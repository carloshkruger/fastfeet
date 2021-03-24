import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { Address } from '@domain/Address'
import { CEP } from '@domain/CEP'
import { CPF } from '@domain/CPF'
import { Delivery } from '@domain/Delivery'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'
import { Email } from '@domain/Email'
import { Password } from '@domain/Password'
import { ProductName } from '@domain/ProductName'
import { User } from '@domain/User'
import { UserName } from '@domain/UserName'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { ListDeliveriesToBeMadeByTheUserUseCase } from '@useCases/ListDeliveriesToBeMadeByTheUser/ListDeliveriesToBeMadeByTheUserUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let listDeliveriesToBeMadeByTheUserUseCase: ListDeliveriesToBeMadeByTheUserUseCase

describe('ListDeliveriesToBeMadeByTheUserUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    listDeliveriesToBeMadeByTheUserUseCase = new ListDeliveriesToBeMadeByTheUserUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )
  })

  it('should return a list of deliveries to be made by a specific delivery man', async () => {
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

    const canceledDelivery = Delivery.create({
      deliveryManId: user.id,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      }),
      createdAt: new Date(),
      canceledAt: new Date()
    })

    const finishedDelivery = DeliveryTestFactory.createWithGivenUser(user)
    finishedDelivery.defineStartDateAsNow()
    finishedDelivery.defineEndDateAsNow()

    jest
      .spyOn(inMemoryDeliveryRepository, 'listDeliveriesToBeMadeByUserId')
      .mockImplementation(async () => [
        delivery,
        canceledDelivery,
        finishedDelivery
      ])

    const response = await listDeliveriesToBeMadeByTheUserUseCase.execute({
      deliveryManId: user.id.value
    })

    expect(response).toHaveProperty('deliveries')
    expect(response.deliveries).toHaveLength(1)
    expect(response.deliveries[0]).toBeInstanceOf(Delivery)
    expect(response.deliveries[0].isCanceled()).toBe(false)
    expect(response.deliveries[0].isFinished()).toBe(false)
  })

  it('should return a list of deliveries to be made by a specific delivery man filtered by a specific neighborhood', async () => {
    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: 'valid_password', hashedValue: '' }),
      cpf: CPF.create({ value: '39782449008' })
    })

    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const validNeighborhood = 'valid neighborhood'

    const delivery = Delivery.create({
      deliveryManId: user.id,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: validNeighborhood,
        city: 'valid city',
        state: 'valid state'
      }),
      createdAt: new Date()
    })

    const delivery2 = Delivery.create({
      deliveryManId: user.id,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: validNeighborhood,
        city: 'valid city',
        state: 'valid state'
      }),
      createdAt: new Date()
    })

    const delivery3 = Delivery.create({
      deliveryManId: user.id,
      recipientName: DeliveryRecipientName.create({
        value: 'valid recipient name'
      }),
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood 3',
        city: 'valid city',
        state: 'valid state'
      }),
      createdAt: new Date()
    })

    jest
      .spyOn(inMemoryDeliveryRepository, 'listDeliveriesToBeMadeByUserId')
      .mockImplementation(async () => [delivery, delivery2, delivery3])

    const response = await listDeliveriesToBeMadeByTheUserUseCase.execute({
      deliveryManId: user.id.value,
      neighborhood: validNeighborhood
    })

    expect(response).toHaveProperty('deliveries')
    expect(response.deliveries).toHaveLength(2)
    expect(response.deliveries[0]).toBeInstanceOf(Delivery)
    expect(response.deliveries[1]).toBeInstanceOf(Delivery)
  })

  it('should throw if delivery man id was not provided', async () => {
    await expect(
      listDeliveriesToBeMadeByTheUserUseCase.execute({
        deliveryManId: ''
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery man id'))
  })

  it('should throw if delivery man was not found', async () => {
    await expect(
      listDeliveriesToBeMadeByTheUserUseCase.execute({
        deliveryManId: new UniqueEntityId().value
      })
    ).rejects.toThrow()
  })
})
