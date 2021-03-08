import { UseCase } from '../../core/domain/UseCase'
import { CPF } from '../../domain/CPF'
import { Email } from '../../domain/Email'
import { Password } from '../../domain/Password'
import { User } from '../../domain/User'
import { UserName } from '../../domain/UserName'
import { CreateUserErrors } from './CreateUserErrors'
import { CreateUserRequest } from './CreateUserRequest'
import { UserRepository } from './CreateUserUseCase.spec'

class CreateUserUseCase implements UseCase<CreateUserRequest, void> {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    cpf
  }: CreateUserRequest): Promise<void> {
    const user = User.create({
      name: UserName.create({ value: name }),
      email: Email.create({ value: email }),
      password: Password.create({ value: password }),
      cpf: CPF.create({ value: cpf })
    })

    const userAlreadyRegistered = await this.userRepository.findByEmail(email)

    if (userAlreadyRegistered) {
      throw new CreateUserErrors.EmailAlreadyRegistered(email)
    }

    await this.userRepository.save(user)
  }
}

export { CreateUserUseCase }
