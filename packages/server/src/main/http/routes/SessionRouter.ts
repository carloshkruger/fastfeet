import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/ExpressRouterAdapter'
import { AuthenticateUserControllerFactory } from '@main/factories/controllers/AuthenticateUserControllerFactory'

const sessionRouter = Router()

sessionRouter.post(
  '/',
  ExpressRouterAdapter.adapt(AuthenticateUserControllerFactory.create())
)

export { sessionRouter }
