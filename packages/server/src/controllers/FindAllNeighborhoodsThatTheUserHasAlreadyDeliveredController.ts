import { Controller, ControllerResponse } from '@core/controller'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase } from '@useCases/FindAllNeighborhoodsThatTheUserHasAlreadyDelivered/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase'

interface HandleParams {
  loggedUserId: string
  neighborhood: string
}

class FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController extends Controller {
  constructor(
    private useCase: FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredUseCase
  ) {
    super()
  }

  async handle({
    loggedUserId,
    neighborhood
  }: HandleParams): Promise<ControllerResponse> {
    try {
      const useCaseResponse = await this.useCase.execute({
        neighborhood,
        userId: loggedUserId
      })

      return this.ok(useCaseResponse)
    } catch (error) {
      return this.fail(error)
    }
  }
}

export { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredController }
