import { UseCase } from '../../core/domain/UseCase'
import { AppError } from '../../core/errors/AppError'
import { CPF } from '../../domain/CPF'
import { Email } from '../../domain/Email'
import { UserName } from '../../domain/UserName'
import { UserRepository } from '../../repositories/UserRepository'
import { CreateUserErrors } from '../CreateUser/CreateUserErrors'
import { UpdateUserRequest } from './UpdateUserRequest'

class UpdateUserUseCase implements UseCase<UpdateUserRequest, void> {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    name,
    email,
    cpf
  }: UpdateUserRequest): Promise<void> {
    if (!userId) {
      throw new AppError('User not found.')
    }

    const userNameValueObject = UserName.create({ value: name })
    const emailValueObject = Email.create({ value: email })
    const cpfValueObject = CPF.create({ value: cpf })

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found.')
    }

    const userAlreadyRegisteredWithGivenEmail = await this.userRepository.findByEmail(
      email
    )

    if (
      userAlreadyRegisteredWithGivenEmail &&
      userAlreadyRegisteredWithGivenEmail.id.value !== userId
    ) {
      throw new CreateUserErrors.EmailAlreadyRegistered(email)
    }

    const userAlreadyRegisteredWithGivenCpf = await this.userRepository.findByCpf(
      cpf
    )

    if (
      userAlreadyRegisteredWithGivenCpf &&
      userAlreadyRegisteredWithGivenCpf.id.value !== userId
    ) {
      throw new CreateUserErrors.CPFAlreadyRegistered(cpf)
    }

    user.updateName(userNameValueObject)
    user.updateEmail(emailValueObject)
    user.updateCpf(cpfValueObject)

    await this.userRepository.save(user)
  }
}

export { UpdateUserUseCase }
