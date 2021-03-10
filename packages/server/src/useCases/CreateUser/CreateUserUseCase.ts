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
import { CreateUserResponse } from './CreateUserResponse'

class CreateUserUseCase
  implements UseCase<CreateUserRequest, CreateUserResponse> {
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
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userNameValueObject = UserName.create({ value: name })
    const emailValueObject = Email.create({ value: email })
    const cpfValueObject = CPF.create({ value: cpf })

    const userAlreadyRegisteredWithGivenEmail = await this.userRepository.findByEmail(
      email
    )

    if (userAlreadyRegisteredWithGivenEmail) {
      throw new CreateUserErrors.EmailAlreadyRegistered(email)
    }

    const userAlreadyRegisteredWithGivenCpf = await this.userRepository.findByCpf(
      cpf
    )

    if (userAlreadyRegisteredWithGivenCpf) {
      throw new CreateUserErrors.CPFAlreadyRegistered(cpf)
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

    return { user }
  }
}

export { CreateUserUseCase }
