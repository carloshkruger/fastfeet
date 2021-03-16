import { Express } from 'express'
import hpp from 'hpp'

export default (app: Express) => {
  app.use(hpp())
}
