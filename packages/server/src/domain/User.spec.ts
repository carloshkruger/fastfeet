import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { CPF } from './CPF'
import { Email } from './Email'
import { Password } from './Password'
import { User } from './User'
import { UserName } from './UserName'

describe('User validation', () => {
  it('should create a User instance with valid values', () => {
    const user = User.create({
      cpf: CPF.create({ value: '39782449008' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      name: UserName.create({ value: 'valid user name' }),
      password: Password.create({ value: 'valid password', hashedValue: '' }),
      isAdmin: true
    })

    expect(user).toBeInstanceOf(User)
    expect(user.id).toBeInstanceOf(UniqueEntityId)
    expect(user.cpf).toBeInstanceOf(CPF)
    expect(user.email).toBeInstanceOf(Email)
    expect(user.name).toBeInstanceOf(UserName)
    expect(user.password).toBeInstanceOf(Password)
    expect(user.isAdmin).toBe(true)
  })

  it('should return false to "isAdmin" if none is provided', () => {
    const user = User.create({
      cpf: CPF.create({ value: '39782449008' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      name: UserName.create({ value: 'valid user name' }),
      password: Password.create({ value: 'valid password', hashedValue: '' })
    })

    expect(user).toBeInstanceOf(User)
    expect(user.isAdmin).toBe(false)
  })
})
