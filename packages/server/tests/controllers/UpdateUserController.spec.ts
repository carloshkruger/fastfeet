import { UpdateUserController } from '@controllers/UpdateUserController'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { UserRepository } from '@repositories/UserRepository'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { UpdateUserUseCase } from '@useCases/UpdateUser/UpdateUserUseCase'

let inMemoryUserRepository: UserRepository
let updateUserUseCase: UpdateUserUseCase
let updateUserController: UpdateUserController

const user = UserTestFactory.create()

const validUserInfo = {
  name: 'valid name',
  email: 'validemail@domain.com',
  cpf: '06864032906',
  loggedUserId: user.id.value
}

describe('UpdateUserController', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    updateUserUseCase = new UpdateUserUseCase(inMemoryUserRepository)
    updateUserController = new UpdateUserController(updateUserUseCase)
  })

  it('should return 204 if user is successfully updated', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const response = await updateUserController.handle(validUserInfo)

    expect(response.statusCode).toBe(204)
  })

  it('should return 500 if UseCase throws', async () => {
    jest.spyOn(updateUserUseCase, 'execute').mockImplementation(() => {
      throw new Error()
    })

    const response = await updateUserController.handle(validUserInfo)

    expect(response.statusCode).toBe(500)
  })
})
