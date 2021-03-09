import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { Address } from '../../domain/Address'
import { CEP } from '../../domain/CEP'
import { CPF } from '../../domain/CPF'
import { Delivery } from '../../domain/Delivery'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { ProductName } from '../../domain/ProductName'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { InMemoryDeliveryRepository } from '../../infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '../../infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { UpdateDeliveryErrors } from './UpdateDeliveryErrors'
import { UpdateDeliveryUseCase } from './UpdateDeliveryUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let updateDeliveryUseCase: UpdateDeliveryUseCase

const user = User.create({
  name: UserName.create({ value: 'valid name' }),
  email: Email.create({ value: 'valid_email@domain.com' }),
  password: Password.create({ value: 'valid_password', hashedValue: '' }),
  cpf: CPF.create({ value: '39782449008' })
})

const delivery = Delivery.create({
  deliveryManId: user.id,
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

const validDeliveryProps = {
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
    ).rejects.toThrow()
  })

  it('should throw if no delivery man id is provided', async () => {
    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: new UniqueEntityId().value,
        deliveryManId: ''
      })
    ).rejects.toThrow()
  })

  it('should throw if delivery was not found', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => null)

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
      .mockImplementation(async () => null)

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

    const deliveryAlreadyInitialized = Delivery.create({
      deliveryManId: user.id,
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      }),
      startDate: new Date()
    })

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryAlreadyInitialized)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: deliveryAlreadyInitialized.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(UpdateDeliveryErrors.DeliveryAlreadyInitialized)
  })

  it('should not be possible to update a delivery already finished', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryAlreadyFinished = Delivery.create({
      deliveryManId: user.id,
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      }),
      startDate: new Date(),
      endDate: new Date()
    })

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryAlreadyFinished)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: deliveryAlreadyFinished.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(UpdateDeliveryErrors.DeliveryAlreadyFinished)
  })

  it('should not be possible to update a delivery canceled', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryCanceled = Delivery.create({
      deliveryManId: user.id,
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

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryCanceled)

    await expect(
      updateDeliveryUseCase.execute({
        ...validDeliveryProps,
        deliveryId: deliveryCanceled.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(UpdateDeliveryErrors.DeliveryCanceled)
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
