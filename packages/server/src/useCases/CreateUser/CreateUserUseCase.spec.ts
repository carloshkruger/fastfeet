import { CPF } from '../../domain/CPF'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { InMemoryUserRepository } from '../../infra/repositories/InMemory/InMemoryUserRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { Encrypter } from '../../shared/providers/EncrypterProvider/Encrypter'
import { FakeEncrypter } from '../../shared/providers/EncrypterProvider/FakeEncrypter'
import { CreateUserErrors } from './CreateUserErrors'
import { CreateUserUseCase } from './CreateUserUseCase'

let createUserUseCase: CreateUserUseCase
let fakeEncrypter: Encrypter
let inMemoryUserRepository: UserRepository

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeEncrypter = new FakeEncrypter()
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
      fakeEncrypter
    )
  })

  it('should not be possible to create an user with invalid name', async () => {
    const validCPF = '39782449008'
    const validEmail = 'valid_email@domain.com'
    const validPassword = '123456789'

    await expect(
      createUserUseCase.execute({
        name: '',
        email: validEmail,
        cpf: validCPF,
        password: validPassword,
        isAdmin: false
      })
    ).rejects.toThrow()
  })

  it('should not be possible to create an user with invalid email', async () => {
    const validCPF = '39782449008'
    const validName = 'valid name'
    const validPassword = '123456789'

    await expect(
      createUserUseCase.execute({
        name: validName,
        email: 'invalid_email',
        cpf: validCPF,
        password: validPassword,
        isAdmin: false
      })
    ).rejects.toThrow()
  })

  it('should not be possible to create an user with invalid cpf', async () => {
    const validEmail = 'valid_email@domain.com'
    const validName = 'valid name'
    const validPassword = '123456789'

    await expect(
      createUserUseCase.execute({
        name: validName,
        email: validEmail,
        cpf: '999.999',
        password: validPassword,
        isAdmin: false
      })
    ).rejects.toThrow()
  })

  it('should not be possible to create an user with invalid password', async () => {
    const validEmail = 'valid_email@domain.com'
    const validName = 'valid name'
    const validCPF = '39782449008'

    await expect(
      createUserUseCase.execute({
        name: validName,
        email: validEmail,
        cpf: validCPF,
        password: '',
        isAdmin: false
      })
    ).rejects.toThrow()
  })

  it('should not be possible to create an user with an email already registered', async () => {
    const validEmail = 'valid_email@domain.com'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: validEmail }),
      password: Password.create({ value: 'valid_password', hashedValue: '' }),
      cpf: CPF.create({ value: '39782449008' })
    })

    await inMemoryUserRepository.save(user)

    await expect(
      createUserUseCase.execute({
        name: 'another user',
        email: validEmail,
        cpf: '832.877.490-99',
        password: 'valid_password',
        isAdmin: false
      })
    ).rejects.toThrow(CreateUserErrors.EmailAlreadyRegistered)
  })

  it('should not be possible to create an user with a cpf already registered', async () => {
    const validCPF = '39782449008'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: 'valid_password', hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    await inMemoryUserRepository.save(user)

    await expect(
      createUserUseCase.execute({
        name: 'another user',
        email: 'another_valid_email@domain.com',
        cpf: validCPF,
        password: 'valid_password',
        isAdmin: false
      })
    ).rejects.toThrow(CreateUserErrors.CPFAlreadyRegistered)
  })

  it('should create an user with valid data', async () => {
    const saveSpy = jest.spyOn(inMemoryUserRepository, 'save')
    const hashSpy = jest.spyOn(fakeEncrypter, 'hash')

    const password = 'valid_password'

    await expect(
      createUserUseCase.execute({
        name: 'valid name',
        email: 'valid_email@domain.com',
        password,
        cpf: '832.877.490-99',
        isAdmin: false
      })
    ).resolves.not.toThrow()

    expect(saveSpy).toHaveBeenCalledTimes(1)
    expect(hashSpy).toHaveBeenCalledWith(password)
  })
})
