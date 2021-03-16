import express from 'express'

import authentication from './middlewares/authentication'
import errorHandler from './middlewares/errorHandler'
import setupCors from './middlewares/cors'
import setupHttpParameterPolution from './middlewares/httpParameterPolution'
import setupSecurityHeaders from './middlewares/securityHeaders'
import { router } from './routes/routes'

const app = express()

setupCors(app)
setupHttpParameterPolution(app)
setupSecurityHeaders(app)
app.use(express.json())
app.use(authentication)
app.use(router)
app.use(errorHandler)

export default app
