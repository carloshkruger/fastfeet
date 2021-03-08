import { CPF } from '../../domain/CPF'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { CreateUserErrors } from './CreateUserErrors'
import { CreateUserUseCase } from './CreateUserUseCase'

export interface UserRepository {
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
}

class InMemoryUserRepository implements UserRepository {
  private data: User[] = []

  async save(user: User): Promise<void> {
    this.data.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.data.find(user => user.email.value === email)

    return user
  }
}

let createUserUseCase: CreateUserUseCase
let inMemoryUserRepository: UserRepository

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
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
        password: validPassword
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
        password: validPassword
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
        password: validPassword
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
        password: ''
      })
    ).rejects.toThrow()
  })

  it('should not be possible to create an user with an email already registered', async () => {
    const validEmail = 'valid_email@domain.com'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: validEmail }),
      password: Password.create({ value: 'valid_password' }),
      cpf: CPF.create({ value: '39782449008' })
    })

    await inMemoryUserRepository.save(user)

    await expect(
      createUserUseCase.execute({
        name: 'another user',
        email: validEmail,
        cpf: '832.877.490-99',
        password: 'valid_password'
      })
    ).rejects.toThrow(CreateUserErrors.EmailAlreadyRegistered)
  })

  it('should create an user with valid data', async () => {
    const saveSpy = jest.spyOn(inMemoryUserRepository, 'save')

    await expect(
      createUserUseCase.execute({
        name: 'valid name',
        email: 'valid_email@domain.com',
        password: 'valid_password',
        cpf: '832.877.490-99'
      })
    ).resolves.not.toThrow()

    expect(saveSpy).toHaveBeenCalledTimes(1)
  })
})
