import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { JWTAuthTokenProvider } from '@shared/providers/AuthTokenProvider/JWTAuthTokenProvider'
import { BCryptEncrypter } from '@shared/providers/EncrypterProvider/BCryptEncrypter'
import { AuthenticateUserUseCase } from '@useCases/AuthenticateUser/AuthenticateUserUseCase'

class AuthenticateUserUseCaseFactory {
  static create(): AuthenticateUserUseCase {
    const userRepository = new TypeOrmUserRepository()
    const encrypter = new BCryptEncrypter(12)
    const authTokenProvider = new JWTAuthTokenProvider()

    return new AuthenticateUserUseCase(
      userRepository,
      encrypter,
      authTokenProvider
    )
  }
}

export { AuthenticateUserUseCaseFactory }
