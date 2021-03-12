import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/ExpressRouterAdapter'
import { CreateUserControllerFactory } from '@main/factories/controllers/CreateUserControllerFactory'
import { UpdateUserControllerFactory } from '@main/factories/controllers/UpdateUserControllerFactory'
import { ListDeliveriesAlreadyMadeByTheUserControllerFactory } from '@main/factories/controllers/ListDeliveriesAlreadyMadeByTheUserControllerFactory'
import { ListDeliveriesToBeMadeByTheUserControllerFactory } from '@main/factories/controllers/ListDeliveriesToBeMadeByTheUserControllerFactory'

const userRouter = Router()

userRouter.post(
  '/',
  ExpressRouterAdapter.adapt(CreateUserControllerFactory.create())
)
userRouter.put(
  '/',
  ExpressRouterAdapter.adapt(UpdateUserControllerFactory.create())
)
userRouter.get(
  '/deliveries-already-made',
  ExpressRouterAdapter.adapt(
    ListDeliveriesAlreadyMadeByTheUserControllerFactory.create()
  )
)
userRouter.get(
  '/deliveries-to-be-made',
  ExpressRouterAdapter.adapt(
    ListDeliveriesToBeMadeByTheUserControllerFactory.create()
  )
)

export { userRouter }
