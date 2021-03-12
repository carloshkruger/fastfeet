import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'

const init = async () => {
  try {
    await TypeOrmHelper.connect()

    const app = (await import('./app')).default

    app.listen(3333, () => console.log('server online'))
  } catch (error) {
    console.error(error)
  }
}

init()
