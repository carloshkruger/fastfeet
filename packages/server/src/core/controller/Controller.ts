import { AppError } from '@core/errors/AppError'

abstract class Controller {
  public abstract handle(props: any): Promise<ControllerResponse>

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

  protected fail(error: Error): ControllerResponse {
    try {
      if (error instanceof AppError) {
        return {
          statusCode: error.statusCode,
          body: {
            error: error.message.trim()
          }
        }
      }

      return this.serverError(error)
    } catch {
      return this.serverError(error)
    }
  }
}

interface ControllerResponse {
  statusCode: number
  body?: any
}

export { Controller, ControllerResponse }
