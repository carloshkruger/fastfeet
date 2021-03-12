import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { UpdateUserUseCase } from '@useCases/UpdateUser/UpdateUserUseCase'

class UpdateUserUseCaseFactory {
  static create(): UpdateUserUseCase {
    const userRepository = new TypeOrmUserRepository()

    return new UpdateUserUseCase(userRepository)
  }
}

export { UpdateUserUseCaseFactory }
