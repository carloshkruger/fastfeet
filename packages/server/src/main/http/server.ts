import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'
import config from './config'

const init = async () => {
  try {
    await TypeOrmHelper.connect()

    const app = (await import('./app')).default

    app.listen(config.serverPort, () => console.log('server online'))
  } catch (error) {
    console.error(error)
  }
}

init()
