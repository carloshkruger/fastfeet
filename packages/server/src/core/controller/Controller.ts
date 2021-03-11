import { AppError } from '@core/errors/AppError'

abstract class Controller {
  public abstract handle(props: ControllerRequest): Promise<ControllerResponse>

  protected ok(data: any): ControllerResponse {
    return {
      statusCode: 200,
      body: data
    }
  }

  protected created(): ControllerResponse {
    return {
      statusCode: 201
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
      errorMessage: 'Internal server error'
    }
  }

  protected fail(error: Error): ControllerResponse {
    if (error instanceof AppError) {
      return {
        statusCode: error.statusCode,
        errorMessage: error.message.trim()
      }
    }

    return this.serverError(error)
  }
}

interface ControllerRequestBody {
  [key: string]: any
}

interface ControllerRequestQuery {
  [key: string]: any
}

interface ControllerRequestParams {
  [key: string]: any
}

interface ControllerRequestAuthData {
  userId: string
}

interface ControllerRequest {
  body: ControllerRequestBody
  query: ControllerRequestQuery
  params: ControllerRequestParams
  authData?: ControllerRequestAuthData
}

interface ControllerResponse {
  statusCode: number
  body?: any
  errorMessage?: string
}

export {
  Controller,
  ControllerRequest,
  ControllerResponse,
  ControllerRequestBody,
  ControllerRequestQuery,
  ControllerRequestParams,
  ControllerRequestAuthData
}
