import { NextFunction, Request, Response } from 'express'

export default (isAdminRoute = false) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (
      !request.user ||
      !request.user.id ||
      (!!isAdminRoute && !request.user.isAdmin)
    ) {
      return response.status(403).json({
        error: 'Access denied.'
      })
    }

    next()
  }
}
