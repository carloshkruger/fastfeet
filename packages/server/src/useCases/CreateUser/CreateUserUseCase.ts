import { UseCase } from '../../core/domain/UseCase'
import { CPF } from '../../domain/CPF'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { UserRepository } from '../../repositories/UserRepository'
import { Encrypter } from '../../shared/providers/EncrypterProvider/Encrypter'
import { CreateUserErrors } from './CreateUserErrors'
import { CreateUserRequest } from './CreateUserRequest'

class CreateUserUseCase implements UseCase<CreateUserRequest, User> {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter
  ) {}

  async execute({
    name,
    email,
    password,
    cpf,
    isAdmin
  }: CreateUserRequest): Promise<User> {
    const userNameValueObject = UserName.create({ value: name })
    const emailValueObject = Email.create({ value: email })
    const cpfValueObject = CPF.create({ value: cpf })

    const userAlreadyRegistered = await this.userRepository.findByEmail(email)

    if (userAlreadyRegistered) {
      throw new CreateUserErrors.EmailAlreadyRegistered(email)
    }

    const hashedPassword = await this.encrypter.hash(password)

    const passwordValueObject = Password.create({
      value: password,
      hashedValue: hashedPassword
    })

    const user = User.create({
      name: userNameValueObject,
      email: emailValueObject,
      password: passwordValueObject,
      cpf: cpfValueObject,
      isAdmin
    })

    await this.userRepository.save(user)

    return user
  }
}

export { CreateUserUseCase }
