import { FieldRequiredError, ForbiddenError, NotFoundError } from '@core/errors'
import { AppError } from '@core/errors/AppError'
import { ConflictError } from '@core/errors/ConflictError'
import { Logger } from '@shared/utils/Logger'

abstract class Controller {
  public async execute(props: ControllerRequest): Promise<ControllerResponse> {
    try {
      const response = await this.handle(props)

      return response
    } catch (error) {
      return this.fail(error)
    }
  }

  public abstract handle(props: ControllerRequest): Promise<ControllerResponse>

  protected ok(data: any): ControllerResponse {
    return {
      statusCode: 200,
      body: data
    }
  }

  protected created(data: any): ControllerResponse {
    return {
      statusCode: 201,
      body: data
    }
  }

  protected noContent(): ControllerResponse {
    return {
      statusCode: 204
    }
  }

  protected serverError(error: Error): ControllerResponse {
    return {
      statusCode: 500,
      body: {
        error: 'Internal server error'
      }
    }
  }

  public fail(error: Error): ControllerResponse {
    Logger.error(error)

    try {
      if (!(error instanceof AppError)) {
        return this.serverError(error)
      }

      let statusCode = 400

      if (error instanceof FieldRequiredError) {
        statusCode = 400
      } else if (error instanceof ForbiddenError) {
        statusCode = 403
      } else if (error instanceof NotFoundError) {
        statusCode = 404
      } else if (error instanceof ConflictError) {
        statusCode = 409
      }

      return {
        statusCode,
        body: {
          error: error.message?.trim()
        }
      }
    } catch {
      return this.serverError(error)
    }
  }
}

interface RequestData {
  [key: string]: any
}

interface RequestFile {
  filename: string
}

interface ControllerRequest {
  data: RequestData
  files?: RequestFile[]
  loggedUserId?: string
}

interface ControllerResponse {
  statusCode: number
  body?: any
}

export { Controller, ControllerRequest, ControllerResponse }
