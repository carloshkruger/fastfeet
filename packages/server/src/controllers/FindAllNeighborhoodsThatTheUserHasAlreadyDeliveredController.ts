import {
  Controller,
  ControllerRequest,
  ControllerResponse
} from '@core/controller'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase } from '@useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDelivered/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase'

class FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController extends Controller {
  constructor(
    private useCase: FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase
  ) {
    super()
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { neighborhood } = request.data
    const { loggedUserId = '' } = request

    const useCaseResponse = await this.useCase.execute({
      neighborhood,
      userId: loggedUserId
    })

    return this.ok(useCaseResponse)
  }
}

export { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController }
