import { CreateDeliveryController } from '@controllers/CreateDeliveryController'
import { CreateDeliveryPresenter } from '@presenters/CreateDeliveryPresenter'
import { UserRepository } from '@repositories/UserRepository'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { CreateDeliveryUseCaseTestFactory } from '@tests/factories/useCases/CreateDeliveryUseCaseTestFactory'
import { CreateDeliveryUseCase } from '@useCases/CreateDelivery/CreateDeliveryUseCase'

let inMemoryUserRepository: UserRepository
let createDeliveryUseCase: CreateDeliveryUseCase
let createDeliveryController: CreateDeliveryController

describe('CreateDeliveryController', () => {
  beforeEach(() => {
    const objects = CreateDeliveryUseCaseTestFactory.create()

    inMemoryUserRepository = objects.inMemoryUserRepository
    createDeliveryUseCase = objects.createDeliveryUseCase
    const presenter = new CreateDeliveryPresenter()

    createDeliveryController = new CreateDeliveryController(
      createDeliveryUseCase,
      presenter
    )
  })

  it('should return 201 if delivery is successfully created', async () => {
    const user = UserTestFactory.create()

    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const response = await createDeliveryController.handle({
      deliveryManId: user.id.value,
      recipientName: 'valid recipient name',
      productName: 'valid product name',
      address: 'valid address',
      city: 'valid city',
      state: 'valid state',
      neighborhood: 'valid neighborhood',
      complement: 'valid complement',
      number: 999,
      postalCode: '89186000'
    })

    expect(response.statusCode).toBe(201)
  })

  it('should return 500 if UseCase throws', async () => {
    const user = UserTestFactory.create()

    jest
      .spyOn(createDeliveryUseCase, 'execute')
      .mockImplementation(async () => {
        throw new Error()
      })

    const response = await createDeliveryController.handle({
      deliveryManId: user.id.value,
      recipientName: 'valid recipient name',
      productName: 'valid product name',
      address: 'valid address',
      city: 'valid city',
      state: 'valid state',
      neighborhood: 'valid neighborhood',
      complement: 'valid complement',
      number: 999,
      postalCode: '89186000'
    })

    expect(response.statusCode).toBe(500)
  })
})
