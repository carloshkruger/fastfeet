import { Controller, ControllerResponse } from '@core/controller'
import { Logger } from '@shared/utils/Logger'
import { removeTempFile } from '@shared/utils/removeTempFile'
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
        try {
          removeTempFile(request.file ? request.file.filename : '')
        } catch {}

        Logger.error(error)

        const controllerResponse = controller.fail(error)

        return response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body)
      }
    }
  }
}

export { ExpressRouterAdapter }
