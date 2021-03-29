import { Controller } from '@core/controller'
import { Logger } from '@shared/utils/Logger'
import { Request, Response } from 'express'

class ExpressRouterAdapter {
  static adapt(controller: Controller) {
    return async (request: Request, response: Response): Promise<Response> => {
      try {
        const data = {
          ...(request.body || {}),
          ...(request.params || {}),
          ...(request.query || {})
        }

        const controllerResponse = await controller.handle({
          data,
          files: request.file ? [request.file] : [],
          loggedUserId: request?.user?.id
        })

        return response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body)
      } catch (error) {
        Logger.error(error)

        return response.status(500).json({
          error: 'Internal server error'
        })
      }
    }
  }
}

export { ExpressRouterAdapter }
