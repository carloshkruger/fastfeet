import { Router } from 'express'

import { userRouter } from './UserRouter'
import { sessionRouter } from './SessionRouter'
import { deliveryRouter } from './DeliveryRouter'

const router = Router()

router.use('/users', userRouter)
router.use('/sessions', sessionRouter)
router.use('/deliveries', deliveryRouter)

export { router }
