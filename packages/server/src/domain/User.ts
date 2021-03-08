import { Entity } from '../core/domain/Entity'
import { UniqueEntityId } from '../core/domain/UniqueEntityId'
import { UserName } from './UserName'
import { Email } from './Email'
import { Password } from './Password'
import { CPF } from './CPF'

interface UserProps {
  name: UserName
  email: Email
  password: Password
  cpf: CPF
  isAdmin?: boolean
}

class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id)
  }

  public static create(props: UserProps, id?: UniqueEntityId): User {
    return new User(props, id)
  }

  public updateName(userName: UserName): void {
    this.props.name = userName
  }

  public updateCpf(cpf: CPF): void {
    this.props.cpf = cpf
  }

  public updateEmail(email: Email): void {
    this.props.email = email
  }

  get name(): UserName {
    return this.props.name
  }

  get email(): Email {
    return this.props.email
  }

  get password(): Password {
    return this.props.password
  }

  get cpf(): CPF {
    return this.props.cpf
  }

  get isAdmin(): boolean {
    return this.props.isAdmin || false
  }
}

export { User }
