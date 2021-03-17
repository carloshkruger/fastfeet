import { getRepository } from 'typeorm'
import request from 'supertest'
import app from '@main/http/app'
import { User } from '@infra/typeorm/models/User'
import { UniqueEntityId } from '@core/domain'
import { JWTAuthTokenProvider } from '@shared/providers/AuthTokenProvider/JWTAuthTokenProvider'
import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { UserMapper } from '@infra/typeorm/mappers/UserMapper'

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

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/users')
        .send({
          name: 'valid user name',
          email: 'valid_email2@domain.com',
          cpf: '683.311.470-65',
          password: '123123',
          passwordConfirmation: '123123'
        })
        .expect(403)
    })
  })

  describe('PUT /users', () => {
    it('should return 204 on success', async () => {
      const user = UserTestFactory.create()

      const repository = getRepository(User)

      await repository.save(repository.create(UserMapper.toRepository(user)))

      const accessToken = authTokenProvider.generate(user.id.value)

      await request(app)
        .put('/users')
        .set('authorization', `Bearer ${accessToken}`)
        .send({
          name: user.name.value,
          email: 'valid_email3@domain.com',
          cpf: user.cpf.value
        })
        .expect(204)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .put('/users')
        .send({
          name: 'valid user name',
          email: 'valid_email3@domain.com',
          cpf: '683.311.470-65'
        })
        .expect(403)
    })
  })

  describe('GET /users/deliveries-already-made', () => {
    it('should return 200 on success', async () => {
      const user = UserTestFactory.create()

      const repository = getRepository(User)

      await repository.save(repository.create(UserMapper.toRepository(user)))

      const accessToken = authTokenProvider.generate(user.id.value)

      await request(app)
        .get('/users/deliveries-already-made')
        .set('authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .get('/users/deliveries-already-made')
        .send()
        .expect(403)
    })
  })

  describe('GET /users/deliveries-to-be-made', () => {
    it('should return 200 on success', async () => {
      const user = UserTestFactory.create()

      const repository = getRepository(User)

      await repository.save(repository.create(UserMapper.toRepository(user)))

      const accessToken = authTokenProvider.generate(user.id.value)

      await request(app)
        .get('/users/deliveries-to-be-made')
        .set('authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app).get('/users/deliveries-to-be-made').send().expect(403)
    })
  })
})
