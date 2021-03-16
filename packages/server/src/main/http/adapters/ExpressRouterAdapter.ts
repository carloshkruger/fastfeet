import { Controller } from '@core/controller'
import { Request, Response } from 'express'

class ExpressRouterAdapter {
  static adapt(controller: Controller) {
    return async (request: Request, response: Response): Promise<Response> => {
      try {
        const params = {
          ...(request.body || {}),
          ...(request.params || {}),
          ...(request.query || {}),
          loggedUserId: request?.user?.id
        }

        const controllerResponse = await controller.handle(params)

        return response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body)
      } catch (error) {
        return response.status(500).json({
          error: 'Internal server error'
        })
      }
    }
  }
}

export { ExpressRouterAdapter }
