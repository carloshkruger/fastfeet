import { UniqueEntityId } from '@core/domain'
import { CPF } from '@domain/CPF'
import { Email } from '@domain/Email'
import { Password } from '@domain/Password'
import { User } from '@domain/User'
import { UserName } from '@domain/UserName'
import { User as TypeOrmUserModel } from '@infra/typeorm/models/User'

class UserMapper {
  static toDomain(userModel: TypeOrmUserModel): User {
    return User.create(
      {
        name: UserName.create({ value: userModel.name }),
        email: Email.create({ value: userModel.email }),
        password: Password.createWithValidatedValue(userModel.password),
        cpf: CPF.create({ value: userModel.cpf }),
        isAdmin: userModel.isAdmin
      },
      new UniqueEntityId(userModel.id)
    )
  }

  static toRepository(user: User): any {
    return {
      id: user.id.value,
      name: user.name.value,
      password: user.password.value,
      email: user.email.value,
      cpf: user.cpf.value,
      isAdmin: user.isAdmin
    }
  }
}

export { UserMapper }
