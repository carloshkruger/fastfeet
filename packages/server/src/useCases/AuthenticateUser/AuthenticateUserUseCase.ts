import { UseCase } from '../../core/domain/UseCase'
import { UserRepository } from '../../repositories/UserRepository'
import { AuthTokenProvider } from '../../shared/providers/AuthTokenProvider/AuthTokenProvider'
import { Encrypter } from '../../shared/providers/EncrypterProvider/Encrypter'
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
    if (!cpf || !password) {
      throw new AuthenticateUserErrors.IncorrectCredentials()
    }

    const user = await this.userRepository.findByCpf(cpf)

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
