import { UniqueEntityId } from '@core/domain/UniqueEntityId'
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
import { CreateDeliveryUseCase } from '@useCases/CreateDelivery/CreateDeliveryUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let createDeliveryUseCase: CreateDeliveryUseCase

describe('CreateDeliveryUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    createDeliveryUseCase = new CreateDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )
  })

  it('should create a delivery with correct values', async () => {
    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: 'valid_password', hashedValue: '' }),
      cpf: CPF.create({ value: '39782449008' })
    })

    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    await expect(
      createDeliveryUseCase.execute({
        deliveryManId: user.id.value,
        recipientName: 'valid recipient name',
        productName: 'valid product name',
        address: 'valid address',
        postalCode: '89186000',
        complement: '',
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      })
    ).resolves.toBeInstanceOf(Delivery)
  })

  it('should not create a delivery with non existing user', async () => {
    await expect(
      createDeliveryUseCase.execute({
        deliveryManId: new UniqueEntityId().value,
        recipientName: 'valid recipient name',
        productName: 'valid product name',
        address: 'valid address',
        postalCode: '89186000',
        complement: '',
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      })
    ).rejects.toThrow()
  })
})
