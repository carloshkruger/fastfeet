import { getRepository } from 'typeorm'

import { User as TypeOrmUserModel } from '@infra/typeorm/models/User'

import { User } from '@domain/User'
import { UserRepository } from '@repositories/UserRepository'
import { UniqueEntityId } from '@core/domain'
import { UserName } from '@domain/UserName'
import { Email } from '@domain/Email'
import { CPF } from '@domain/CPF'
import { Password } from '@domain/Password'

class TypeOrmUserRepository implements UserRepository {
  private repository = getRepository(TypeOrmUserModel)

  async save(user: User): Promise<void> {
    const model = this.repository.create({
      id: user.id.value,
      name: user.name.value,
      password: user.password.value,
      email: user.email.value,
      cpf: user.cpf.value,
      isAdmin: user.isAdmin
    })

    await this.repository.save(model)
  }

  async findById(userId: string): Promise<User | undefined> {
    const model = await this.repository.findOne({
      where: {
        id: userId
      }
    })

    if (!model) {
      return undefined
    }

    return User.create(
      {
        name: UserName.create({ value: model.name }),
        email: Email.create({ value: model.email }),
        cpf: CPF.create({ value: model.cpf }),
        password: Password.createWithValidatedValue(model.password),
        isAdmin: model.isAdmin
      },
      new UniqueEntityId(model.id)
    )
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const model = await this.repository.findOne({
      where: {
        email
      }
    })

    if (!model) {
      return undefined
    }

    return User.create(
      {
        name: UserName.create({ value: model.name }),
        email: Email.create({ value: model.email }),
        cpf: CPF.create({ value: model.cpf }),
        password: Password.createWithValidatedValue(model.password),
        isAdmin: model.isAdmin
      },
      new UniqueEntityId(model.id)
    )
  }

  async findByCpf(cpf: string): Promise<User | undefined> {
    const model = await this.repository.findOne({
      where: {
        cpf
      }
    })

    if (!model) {
      return undefined
    }

    return User.create(
      {
        name: UserName.create({ value: model.name }),
        email: Email.create({ value: model.email }),
        cpf: CPF.create({ value: model.cpf }),
        password: Password.createWithValidatedValue(model.password),
        isAdmin: model.isAdmin
      },
      new UniqueEntityId(model.id)
    )
  }
}

export { TypeOrmUserRepository }
