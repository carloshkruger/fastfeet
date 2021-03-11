import { AppError } from '@core/errors/AppError'

abstract class Controller {
  public abstract handle(props: any): Promise<ControllerResponse>

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
    try {
      if (error instanceof AppError) {
        return {
          statusCode: error.statusCode,
          errorMessage: error.message.trim()
        }
      }

      return this.serverError(error)
    } catch {
      console.log(error)

      return this.serverError(error)
    }
  }
}

interface ControllerResponse {
  statusCode: number
  body?: any
  errorMessage?: string
}

export { Controller, ControllerResponse }
