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
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      })
    })

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
      canceledAt: new Date()
    })

    const finishedDelivery = Delivery.create({
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
      endDate: new Date()
    })

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

    expect(response).toHaveLength(1)
    expect(response[0]).toBeInstanceOf(Delivery)
    expect(response[0].isCanceled()).toBe(false)
    expect(response[0].isFinished()).toBe(true)
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
