import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { BCryptEncrypter } from '@shared/providers/EncrypterProvider/BCryptEncrypter'
import { CreateUserUseCase } from '@useCases/CreateUser/CreateUserUseCase'

class CreateUserUseCaseFactory {
  static create(): CreateUserUseCase {
    const userRepository = new TypeOrmUserRepository()
    const encrypter = new BCryptEncrypter()

    return new CreateUserUseCase(userRepository, encrypter)
  }
}

export { CreateUserUseCaseFactory }
