import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import authentication from './middlewares/authentication'
import errorHandler from './middlewares/errorHandler'
import { router } from './routes/routes'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(authentication)
app.use(router)
app.use(errorHandler)

export default app
