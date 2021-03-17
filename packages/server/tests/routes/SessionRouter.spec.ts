import { getRepository } from 'typeorm'
import request from 'supertest'

import { UserMapper } from '@infra/typeorm/mappers/UserMapper'
import { User } from '@infra/typeorm/models/User'
import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import app from '@main/http/app'

describe('SessionRouter', () => {
  beforeAll(async () => {
    await TypeOrmHelper.connect()
  })

  afterAll(async () => {
    await TypeOrmHelper.clear()
    await TypeOrmHelper.disconnect()
  })

  beforeEach(async () => {
    await TypeOrmHelper.clear()
  })

  describe('/POST sessions', () => {
    it('should return 200 on success', async () => {
      const user = await UserTestFactory.createWithHashedPassword()

      const repository = getRepository(User)

      await repository.save(repository.create(UserMapper.toRepository(user)))

      await request(app)
        .post('/sessions')
        .send({
          cpf: user.cpf.value,
          password: user.password.plainTextPassword
        })
        .expect(200)
    })
  })
})
