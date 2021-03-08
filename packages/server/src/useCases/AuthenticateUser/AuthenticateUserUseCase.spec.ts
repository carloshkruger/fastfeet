import { CPF } from '../../domain/CPF'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { InMemoryUserRepository } from '../../infra/repositories/InMemory/InMemoryUserRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { AuthTokenProvider } from '../../shared/providers/AuthTokenProvider/AuthTokenProvider'
import { FakeAuthTokenProvider } from '../../shared/providers/AuthTokenProvider/FakeAuthTokenProvider'
import { Encrypter } from '../../shared/providers/EncrypterProvider/Encrypter'
import { FakeEncrypter } from '../../shared/providers/EncrypterProvider/FakeEncrypter'
import { AuthenticateUserErrors } from './AuthenticateUserErrors'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let inMemoryUserRepository: UserRepository
let fakeEncrypter: Encrypter
let fakeAuthTokenProvider: AuthTokenProvider
let authenticateUserUseCase: AuthenticateUserUseCase

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeAuthTokenProvider = new FakeAuthTokenProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeEncrypter,
      fakeAuthTokenProvider
    )
  })

  it('should be able to authenticate with correct values', async () => {
    const validCPF = '39782449008'
    const validPassword = 'valid_password'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    jest
      .spyOn(inMemoryUserRepository, 'findByCpf')
      .mockImplementation(async cpf => user)

    jest.spyOn(fakeEncrypter, 'compare').mockImplementation(async () => true)

    const generateTokenSpy = jest.spyOn(fakeAuthTokenProvider, 'generate')

    const response = await authenticateUserUseCase.execute({
      cpf: validCPF,
      password: validPassword
    })

    expect(response.accessToken).toBeTruthy()
    expect(response.user).toBeTruthy()
    expect(generateTokenSpy).toBeCalledWith(user.id.value)
  })

  it('should not be possible to authenticate without a cpf', async () => {
    const validPassword = 'valid_password'

    await expect(
      authenticateUserUseCase.execute({
        cpf: '',
        password: validPassword
      })
    ).rejects.toThrow(AuthenticateUserErrors.IncorrectCredentials)
  })

  it('should not be possible to authenticate without a password', async () => {
    const validCPF = '39782449008'

    await expect(
      authenticateUserUseCase.execute({
        cpf: validCPF,
        password: ''
      })
    ).rejects.toThrow(AuthenticateUserErrors.IncorrectCredentials)
  })

  it('should not be possible to authenticate with a non existing user', async () => {
    const validCPF = '39782449008'
    const validPassword = 'valid_password'

    await expect(
      authenticateUserUseCase.execute({
        cpf: validCPF,
        password: validPassword
      })
    ).rejects.toThrow(AuthenticateUserErrors.IncorrectCredentials)
  })

  it('should not be possible to authenticate with an invalid password', async () => {
    const validCPF = '39782449008'
    const validPassword = 'valid_password'

    jest
      .spyOn(inMemoryUserRepository, 'findByCpf')
      .mockImplementation(async cpf => {
        return User.create({
          name: UserName.create({ value: 'valid name' }),
          email: Email.create({ value: 'valid_email@domain.com' }),
          password: Password.create({ value: validPassword, hashedValue: '' }),
          cpf: CPF.create({ value: validCPF })
        })
      })

    jest.spyOn(fakeEncrypter, 'compare').mockImplementation(async () => false)

    await expect(
      authenticateUserUseCase.execute({
        cpf: validCPF,
        password: validPassword
      })
    ).rejects.toThrow(AuthenticateUserErrors.IncorrectCredentials)
  })
})
