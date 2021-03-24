import { Router } from 'express'

import upload from '../middlewares/upload'
import authorization from '../middlewares/authorization'

import { ExpressRouterAdapter } from '../adapters/ExpressRouterAdapter'
import { CreateDeliveryControllerFactory } from '@main/factories/controllers/CreateDeliveryControllerFactory'
import { UpdateDeliveryControllerFactory } from '@main/factories/controllers/UpdateDeliveryControllerFactory'
import { StartDeliveryControllerFactory } from '@main/factories/controllers/StartDeliveryControllerFactory'
import { FinalizeDeliveryControllerFactory } from '@main/factories/controllers/FinalizeDeliveryControllerFactory'
import { DeleteDeliveryControllerFactory } from '@main/factories/controllers/DeleteDeliveryControllerFactory'
import { FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory } from '@main/factories/controllers/FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory'
import { FindDeliveryDetailsControllerFactory } from '@main/factories/controllers/FindDeliveryDetailsControllerFactory'

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
  upload.single('image'),
  ExpressRouterAdapter.adapt(FinalizeDeliveryControllerFactory.create())
)
deliveryRouter.get(
  '/neighborhoods',
  ExpressRouterAdapter.adapt(
    FindAllNeighborhoodsThatTheUserHasAlreadyDeliveredControllerFactory.create()
  )
)
deliveryRouter.get(
  '/:deliveryId',
  ExpressRouterAdapter.adapt(FindDeliveryDetailsControllerFactory.create())
)

export { deliveryRouter }
