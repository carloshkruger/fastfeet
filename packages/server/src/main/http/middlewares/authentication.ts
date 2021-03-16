import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { JWTAuthTokenProvider } from '@shared/providers/AuthTokenProvider/JWTAuthTokenProvider'
import { NextFunction, Request, Response } from 'express'

const authTokenProvider = new JWTAuthTokenProvider()
const userRepository = new TypeOrmUserRepository()

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization

    if (!authorization) {
      return next()
    }

    const [, accessToken] = authorization.split(' ')

    if (!accessToken) {
      return next()
    }

    let userId

    try {
      const data = authTokenProvider.decrypt(accessToken)
      userId = data.userId
    } catch {
      return next()
    }

    if (!userId) {
      return next()
    }

    const user = await userRepository.findById(userId)

    if (!user) {
      return next()
    }

    request.user = {
      id: user.id.value,
      isAdmin: user.isAdmin
    }

    return next()
  } catch (error) {
    next(error)
  }
}
