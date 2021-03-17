import { isTestEnvironment } from '@shared/utils/isTestEnvironment'
import { createConnection, getConnection, getConnectionOptions } from 'typeorm'

class TypeOrmHelper {
  static async connect(): Promise<void> {
    if (isTestEnvironment()) {
      const { entities, migrations, cli } = await getConnectionOptions()

      await createConnection({
        type: 'postgres',
        host: process.env.FASTFEET_TEST_TYPEORM_HOST,
        port: Number(process.env.FASTFEET_TEST_TYPEORM_PORT),
        username: process.env.FASTFEET_TEST_TYPEORM_USERNAME,
        password: process.env.FASTFEET_TEST_TYPEORM_PASSWORD,
        database: process.env.FASTFEET_TEST_TYPEORM_DATABASE,
        dropSchema: true,
        logging: false,
        migrationsRun: true,
        entities,
        migrations,
        cli
      })
    } else {
      await createConnection()
    }
  }

  static async disconnect(): Promise<void> {
    await getConnection().close()
  }

  static async clear(): Promise<void> {
    const connection = getConnection()
    const entities = connection.entityMetadatas

    const deletePromises = entities.map(entity => {
      const repository = connection.getRepository(entity.name)
      return repository.query(`DELETE FROM ${entity.tableName}`)
    })

    await Promise.all(deletePromises)
  }
}

export { TypeOrmHelper }
