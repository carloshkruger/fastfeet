import express, { NextFunction, Request, Response } from 'express'
import { router } from './routes/routes'

const app = express()

app.use(express.json())
app.use(router)
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      error: 'Internal server error'
    })
  }
)

export default app
