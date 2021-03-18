import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'
import config from './config'
import { Logger } from '@shared/utils/Logger'

const init = async () => {
  try {
    throw new Error('asd')
    await TypeOrmHelper.connect()

    const app = (await import('./app')).default

    app.listen(config.serverPort, () => Logger.debug('Server online'))
  } catch (error) {
    Logger.error(error)
  }
}

init()
