import { Controller } from '@core/controller'
import { removeTempFile } from '@shared/utils/removeTempFile'
import { Request, Response } from 'express'

class ExpressRouterAdapter {
  static adapt(controller: Controller) {
    return async (request: Request, response: Response): Promise<Response> => {
      const data = {
        ...(request.body || {}),
        ...(request.params || {}),
        ...(request.query || {})
      }

      const controllerResponse = await controller.execute({
        data,
        files: request.file ? [request.file] : [],
        loggedUserId: request?.user?.id
      })

      if (controllerResponse.statusCode >= 400) {
        removeTempFile(request?.file?.filename || '')
      }

      return response
        .status(controllerResponse.statusCode)
        .json(controllerResponse.body)
    }
  }
}

export { ExpressRouterAdapter }
