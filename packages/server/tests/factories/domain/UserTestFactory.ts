import { CPF } from '@domain/CPF'
import { Email } from '@domain/Email'
import { Password } from '@domain/Password'
import { User } from '@domain/User'
import { UserName } from '@domain/UserName'

class UserTestFactory {
  static create(): User {
    return User.create({
      name: UserName.create({ value: 'valid user name' }),
      email: Email.create({ value: 'valid_email@domain.com' }),
      cpf: CPF.create({ value: '39782449008' }),
      password: Password.create({
        value: 'valid_password',
        hashedValue: 'hashed_password'
      }),
      isAdmin: false
    })
  }
}

export { UserTestFactory }
