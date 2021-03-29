import { CreateUserResponse } from '../useCases/CreateUser/CreateUserResponse'

interface CreateUserPresenterResponse {
  id: string
}

class CreateUserPresenter {
  transform({ user }: CreateUserResponse): CreateUserPresenterResponse {
    return {
      id: user.id.value
    }
  }
}

export { CreateUserPresenter }
