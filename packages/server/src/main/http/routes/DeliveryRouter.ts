import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/ExpressRouterAdapter'
import { CreateDeliveryControllerFactory } from '@main/factories/controllers/CreateDeliveryControllerFactory'
import { UpdateDeliveryControllerFactory } from '@main/factories/controllers/UpdateDeliveryControllerFactory'
import { StartDeliveryControllerFactory } from '@main/factories/controllers/StartDeliveryControllerFactory'
import { FinalizeDeliveryControllerFactory } from '@main/factories/controllers/FinalizeDeliveryControllerFactory'
import { DeleteDeliveryControllerFactory } from '@main/factories/controllers/DeleteDeliveryControllerFactory'

import authorization from '../middlewares/authorization'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory } from '@main/factories/controllers/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory'

const deliveryRouter = Router()

deliveryRouter.use(authorization())

deliveryRouter.post(
  '/',
  ExpressRouterAdapter.adapt(CreateDeliveryControllerFactory.create())
)
deliveryRouter.put(
  '/:deliveryId',
  ExpressRouterAdapter.adapt(UpdateDeliveryControllerFactory.create())
)
deliveryRouter.delete(
  '/:deliveryId',
  ExpressRouterAdapter.adapt(DeleteDeliveryControllerFactory.create())
)
deliveryRouter.post(
  '/:deliveryId/start',
  ExpressRouterAdapter.adapt(StartDeliveryControllerFactory.create())
)
deliveryRouter.post(
  '/:deliveryId/finalize',
  ExpressRouterAdapter.adapt(FinalizeDeliveryControllerFactory.create())
)
deliveryRouter.get(
  '/neighborhoods',
  ExpressRouterAdapter.adapt(
    FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory.create()
  )
)

export { deliveryRouter }
