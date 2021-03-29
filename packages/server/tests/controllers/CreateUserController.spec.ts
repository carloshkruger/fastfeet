import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { CreateUserPresenter } from '@presenters/CreateUserPresenter'
import { UserRepository } from '@repositories/UserRepository'
import { Encrypter } from '@shared/providers/EncrypterProvider/Encrypter'
import { FakeEncrypter } from '@shared/providers/EncrypterProvider/FakeEncrypter'
import { CreateUserUseCase } from '@useCases/CreateUser/CreateUserUseCase'
import { CreateUserController } from '@controllers/CreateUserController'

let inMemoryUserRepository: UserRepository
let fakeEncrypter: Encrypter
let createUserUseCase: CreateUserUseCase
let createUserṔresenter: CreateUserPresenter
let createUserController: CreateUserController

const validUserInfo = {
  name: 'valid name',
  password: 'valid password',
  passwordConfirmation: 'valid password',
  cpf: '06864032906',
  email: 'valid_email@domain.com',
  isAdmin: false
}

describe('CreateUserController', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeEncrypter = new FakeEncrypter()
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
      fakeEncrypter
    )
    createUserṔresenter = new CreateUserPresenter()
    createUserController = new CreateUserController(
      createUserUseCase,
      createUserṔresenter
    )
  })

  it('should return 201 if user is successfully created', async () => {
    const response = await createUserController.handle({
      data: validUserInfo
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).not.toHaveProperty('password')
  })

  it('should call use case with correct values', async () => {
    const useCaseSpy = jest.spyOn(createUserUseCase, 'execute')

    await createUserController.handle({
      data: validUserInfo
    })

    expect(useCaseSpy).toHaveBeenCalledWith(validUserInfo)
  })

  it('should throws if Presenter throws', async () => {
    jest.spyOn(createUserṔresenter, 'transform').mockImplementation(() => {
      throw new Error()
    })

    await expect(
      createUserController.handle({
        data: validUserInfo
      })
    ).rejects.toThrow()
  })
})
