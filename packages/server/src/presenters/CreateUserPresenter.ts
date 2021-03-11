import { CreateUserResponse } from '../useCases/CreateUser/CreateUserResponse'
import { Presenter } from '../core/presenter'

interface CreateUserPresenterResponse {
  id: string
}

class CreateUserPresenter extends Presenter<CreateUserPresenterResponse> {
  transform({ user }: CreateUserResponse): CreateUserPresenterResponse {
    return {
      id: user.id.value
    }
  }
}

export { CreateUserPresenter }
