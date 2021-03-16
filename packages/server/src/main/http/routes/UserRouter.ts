import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/ExpressRouterAdapter'
import { CreateUserControllerFactory } from '@main/factories/controllers/CreateUserControllerFactory'
import { UpdateUserControllerFactory } from '@main/factories/controllers/UpdateUserControllerFactory'
import { ListDeliveriesAlreadyMadeByTheUserControllerFactory } from '@main/factories/controllers/ListDeliveriesAlreadyMadeByTheUserControllerFactory'
import { ListDeliveriesToBeMadeByTheUserControllerFactory } from '@main/factories/controllers/ListDeliveriesToBeMadeByTheUserControllerFactory'
import authorization from '../middlewares/authorization'

const userRouter = Router()

userRouter.post(
  '/',
  authorization(true),
  ExpressRouterAdapter.adapt(CreateUserControllerFactory.create())
)
userRouter.put(
  '/',
  authorization(),
  ExpressRouterAdapter.adapt(UpdateUserControllerFactory.create())
)
userRouter.get(
  '/deliveries-already-made',
  authorization(),
  ExpressRouterAdapter.adapt(
    ListDeliveriesAlreadyMadeByTheUserControllerFactory.create()
  )
)
userRouter.get(
  '/deliveries-to-be-made',
  authorization(),
  ExpressRouterAdapter.adapt(
    ListDeliveriesToBeMadeByTheUserControllerFactory.create()
  )
)

export { userRouter }
