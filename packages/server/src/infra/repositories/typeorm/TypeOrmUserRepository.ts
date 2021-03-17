import { getRepository, Repository } from 'typeorm'

import { User as TypeOrmUserModel } from '@infra/typeorm/models/User'

import { User } from '@domain/User'
import { UserRepository } from '@repositories/UserRepository'
import { UserMapper } from '@infra/typeorm/mappers/UserMapper'

class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<TypeOrmUserModel>

  private getRepository(): Repository<TypeOrmUserModel> {
    if (!this.repository) {
      this.repository = getRepository(TypeOrmUserModel)
    }

    return this.repository
  }

  async save(user: User): Promise<void> {
    const model = this.getRepository().create(UserMapper.toRepository(user))

    await this.getRepository().save(model)
  }

  async findById(userId: string): Promise<User | undefined> {
    const model = await this.getRepository().findOne({
      where: {
        id: userId
      }
    })

    if (!model) {
      return undefined
    }

    return UserMapper.toDomain(model)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const model = await this.getRepository().findOne({
      where: {
        email
      }
    })

    if (!model) {
      return undefined
    }

    return UserMapper.toDomain(model)
  }

  async findByCpf(cpf: string): Promise<User | undefined> {
    const model = await this.getRepository().findOne({
      where: {
        cpf
      }
    })

    if (!model) {
      return undefined
    }

    return UserMapper.toDomain(model)
  }
}

export { TypeOrmUserRepository }
