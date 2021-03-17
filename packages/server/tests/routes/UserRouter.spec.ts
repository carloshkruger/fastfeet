import { getRepository } from 'typeorm'
import request from 'supertest'
import app from '@main/http/app'
import { User } from '@infra/typeorm/models/User'
import { UniqueEntityId } from '@core/domain'
import { JWTAuthTokenProvider } from '@shared/providers/AuthTokenProvider/JWTAuthTokenProvider'
import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'

const authTokenProvider = new JWTAuthTokenProvider()

describe('UserRouter', () => {
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

  describe('POST /users', () => {
    it('should return 201 on success', async () => {
      const repository = getRepository(User)

      const user = repository.create({
        id: new UniqueEntityId().value,
        name: 'valid user name',
        email: 'valid_email@domain.com',
        cpf: '06864032906',
        password: '123123',
        isAdmin: true
      })

      await repository.save(user)

      const accessToken = authTokenProvider.generate(user.id)

      await request(app)
        .post('/users')
        .set('authorization', `Bearer ${accessToken}`)
        .send({
          name: 'valid user name',
          email: 'valid_email2@domain.com',
          cpf: '683.311.470-65',
          password: '123123',
          passwordConfirmation: '123123'
        })
        .expect(201)
    })
  })
})
