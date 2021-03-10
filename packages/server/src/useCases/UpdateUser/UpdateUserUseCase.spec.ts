import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { CPF } from '../../domain/CPF'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { InMemoryUserRepository } from '../../infra/repositories/InMemory/InMemoryUserRepository'
import { UserRepository } from '../../repositories/UserRepository'
import { UpdateUserUseCase } from './UpdateUserUseCase'

let inMemoryUserRepository: UserRepository
let updateUserUseCase: UpdateUserUseCase

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should update an user with correct values', async () => {
    const validCPF = '39782449008'
    const validPassword = 'valid_password'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    await inMemoryUserRepository.save(user)

    const saveSpy = jest.spyOn(inMemoryUserRepository, 'save')

    await expect(
      updateUserUseCase.execute({
        userId: user.id.value,
        name: 'another valid name',
        cpf: '122.998.660-00',
        email: 'another_valid_email@domain.com'
      })
    ).resolves.not.toThrow()

    expect(saveSpy).toHaveBeenCalledTimes(1)
  })

  it('should not update an user with invalid id', async () => {
    const validCPF = '39782449008'
    const validPassword = 'valid_password'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    await inMemoryUserRepository.save(user)

    const saveSpy = jest.spyOn(inMemoryUserRepository, 'save')
    const anotherUserId = new UniqueEntityId()

    await expect(
      updateUserUseCase.execute({
        userId: anotherUserId.value,
        name: 'another valid name',
        cpf: '122.998.660-00',
        email: 'another_valid_email@domain.com'
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not update an user with an empty id', async () => {
    const validCPF = '39782449008'
    const validPassword = 'valid_password'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    await inMemoryUserRepository.save(user)

    const saveSpy = jest.spyOn(inMemoryUserRepository, 'save')

    await expect(
      updateUserUseCase.execute({
        userId: '',
        name: 'another valid name',
        cpf: '122.998.660-00',
        email: 'another_valid_email@domain.com'
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not update an user with an email already registered', async () => {
    const validCPF = '39782449008'
    const validPassword = 'valid_password'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    const user2 = User.create({
      name: UserName.create({ value: 'valid name 2' }),
      email: Email.create({ value: 'valid_email2@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    await inMemoryUserRepository.save(user)
    await inMemoryUserRepository.save(user2)

    const saveSpy = jest.spyOn(inMemoryUserRepository, 'save')

    await expect(
      updateUserUseCase.execute({
        userId: user.id.value,
        name: 'another valid name',
        cpf: '122.998.660-00',
        email: 'valid_email2@domain.com'
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not update an user with an CPF already registered', async () => {
    const validCPF = '39782449008'
    const validCPFUser2 = '58260322005'
    const validPassword = 'valid_password'

    const user = User.create({
      name: UserName.create({ value: 'valid name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPF })
    })

    const user2 = User.create({
      name: UserName.create({ value: 'valid name 2' }),
      email: Email.create({ value: 'valid_email2@domain.com' }),
      password: Password.create({ value: validPassword, hashedValue: '' }),
      cpf: CPF.create({ value: validCPFUser2 })
    })

    await inMemoryUserRepository.save(user)
    await inMemoryUserRepository.save(user2)

    const saveSpy = jest.spyOn(inMemoryUserRepository, 'save')

    await expect(
      updateUserUseCase.execute({
        userId: user.id.value,
        name: 'another valid name',
        cpf: validCPFUser2,
        email: 'another_valid_email@domain.com'
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })
})
