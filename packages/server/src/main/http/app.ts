import express from 'express'

import authentication from './middlewares/authentication'
import errorHandler from './middlewares/errorHandler'
import { router } from './routes/routes'

const app = express()

app.use(express.json())
app.use(authentication)
app.use(router)
app.use(errorHandler)

export default app
