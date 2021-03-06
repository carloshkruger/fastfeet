import { UseCase } from '@core/domain/UseCase'
import { CPF } from '@domain/CPF'
import { UserRepository } from '@repositories/UserRepository'
import { AuthTokenProvider } from '@shared/providers/AuthTokenProvider/AuthTokenProvider'
import { Encrypter } from '@shared/providers/EncrypterProvider/Encrypter'
import { isEmpty } from '@shared/utils/String'
import { AuthenticateUserErrors } from './AuthenticateUserErrors'
import { AuthenticateUserRequest } from './AuthenticateUserRequest'
import { AuthenticateUserResponse } from './AuthenticateUserResponse'

class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserRequest, AuthenticateUserResponse> {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter,
    private authTokenProvider: AuthTokenProvider
  ) {}

  async execute({
    cpf,
    password
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const cpfValueObject = CPF.create({ value: cpf })

    if (isEmpty(cpf) || isEmpty(password)) {
      throw new AuthenticateUserErrors.IncorrectCredentials()
    }

    const user = await this.userRepository.findByCpf(cpfValueObject.value)

    if (!user) {
      throw new AuthenticateUserErrors.IncorrectCredentials()
    }

    const passwordMatch = await this.encrypter.compare({
      plainTextValue: password,
      encryptedValue: user.password.value
    })

    if (!passwordMatch) {
      throw new AuthenticateUserErrors.IncorrectCredentials()
    }

    const accessToken = this.authTokenProvider.generate(user.id.value)

    return {
      user,
      accessToken
    }
  }
}

export { AuthenticateUserUseCase }
