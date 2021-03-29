import { AuthenticateUserController } from '@controllers/AuthenticateUserController'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { AuthenticateUserPresenter } from '@presenters/AuthenticateUserPresenter'
import { UserRepository } from '@repositories/UserRepository'
import { AuthTokenProvider } from '@shared/providers/AuthTokenProvider/AuthTokenProvider'
import { FakeAuthTokenProvider } from '@shared/providers/AuthTokenProvider/FakeAuthTokenProvider'
import { Encrypter } from '@shared/providers/EncrypterProvider/Encrypter'
import { FakeEncrypter } from '@shared/providers/EncrypterProvider/FakeEncrypter'
import { AuthenticateUserUseCase } from '@useCases/AuthenticateUser/AuthenticateUserUseCase'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'

let inMemoryUserRepository: UserRepository
let fakeEncrypter: Encrypter
let fakeAuthTokenProvider: AuthTokenProvider
let authenticateUserUseCase: AuthenticateUserUseCase
let authenticateUserPresenter: AuthenticateUserPresenter
let authenticateUserController: AuthenticateUserController

const validAuthenticationInfo = {
  cpf: '06864032906',
  password: 'valid_password'
}

describe('AuthenticateUserController', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeAuthTokenProvider = new FakeAuthTokenProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeEncrypter,
      fakeAuthTokenProvider
    )
    authenticateUserPresenter = new AuthenticateUserPresenter()
    authenticateUserController = new AuthenticateUserController(
      authenticateUserUseCase,
      authenticateUserPresenter
    )
  })

  it('should return 200 if user is successfully authenticated', async () => {
    jest
      .spyOn(authenticateUserUseCase, 'execute')
      .mockImplementation(async () => {
        return {
          accessToken: 'access_token',
          user: UserTestFactory.create()
        }
      })

    const response = await authenticateUserController.handle({
      data: validAuthenticationInfo
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('user')
    expect(response.body.user).not.toHaveProperty('password')
    expect(response.body.user).not.toHaveProperty('cpf')
  })

  it('should call use case with correct values', async () => {
    const useCaseSpy = jest.spyOn(authenticateUserUseCase, 'execute')

    await authenticateUserController.handle({
      data: validAuthenticationInfo
    })

    expect(useCaseSpy).toHaveBeenCalledWith(validAuthenticationInfo)
  })

  it('should return 500 if Presenter throws', async () => {
    jest
      .spyOn(authenticateUserUseCase, 'execute')
      .mockImplementation(async () => {
        return {
          accessToken: 'access_token',
          user: UserTestFactory.create()
        }
      })

    jest
      .spyOn(authenticateUserPresenter, 'transform')
      .mockImplementation(() => {
        throw new Error()
      })

    const response = await authenticateUserController.handle({
      data: validAuthenticationInfo
    })

    expect(response.statusCode).toBe(500)
  })
})
