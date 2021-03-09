import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { Address } from '../../domain/Address'
import { CEP } from '../../domain/CEP'
import { CPF } from '../../domain/CPF'
import { Delivery } from '../../domain/Delivery'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { InMemoryDeliveryRepository } from '../../infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '../../infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { FinalizeDeliveryErrors } from './FinalizeDeliveryErrors'
import { FinalizeDeliveryUseCase } from './FinalizeDeliveryUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let finalizeDeliveryUseCase: FinalizeDeliveryUseCase

const user = User.create({
  name: UserName.create({ value: 'valid name' }),
  email: Email.create({ value: 'valid_email@domain.com' }),
  password: Password.create({ value: 'valid_password', hashedValue: '' }),
  cpf: CPF.create({ value: '39782449008' })
})

const delivery = Delivery.create({
  deliveryManId: user.id,
  productName: 'valid product name',
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

describe('FinalizeDeliveryUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    finalizeDeliveryUseCase = new FinalizeDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository
    )
  })

  it('should throw if no delivery man id is provided', async () => {
    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryManId: '',
        deliveryId: new UniqueEntityId().value
      })
    ).rejects.toThrow()
  })

  it('should throw if no delivery id is provided', async () => {
    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryManId: new UniqueEntityId().value,
        deliveryId: ''
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

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
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
      .mockImplementation(async () => null)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: new UniqueEntityId().value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not be possible to the user finalize a delivery that is not linked to him', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryNotLinkedToTheUser = Delivery.create({
      deliveryManId: new UniqueEntityId(),
      productName: 'valid product name',
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      })
    })

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryNotLinkedToTheUser)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: deliveryNotLinkedToTheUser.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(FinalizeDeliveryErrors.DeliveryNotLinkedToUser)

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not be possible to the user finalize a delivery that is not initialized', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryNotInitialized = Delivery.create({
      deliveryManId: user.id,
      productName: 'valid product name',
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      })
    })

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryNotInitialized)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: deliveryNotInitialized.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(FinalizeDeliveryErrors.DeliveryNotInitialized)

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should be possible to the user finalize a delivery', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value
      })
    ).resolves.not.toThrow()

    const paramPassedToSaveMethod: Delivery = saveSpy.mock.calls[0][0]

    expect(saveSpy).toHaveBeenCalledTimes(1)
    expect(paramPassedToSaveMethod.id.value).toBe(delivery.id.value)
    expect(paramPassedToSaveMethod.endDate).toBeInstanceOf(Date)
  })
})
