import { createConnection } from 'typeorm'

class TypeOrmHelper {
  static async connect(): Promise<void> {
    await createConnection()
  }
}

export { TypeOrmHelper }
