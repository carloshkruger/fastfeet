import { getRepository, Repository } from 'typeorm'
import request from 'supertest'
import path from 'path'

import { UserMapper } from '@infra/typeorm/mappers/UserMapper'
import { User as TypeOrmUserModel } from '@infra/typeorm/models/User'
import { Delivery as TypeOrmDeliveryModel } from '@infra/typeorm/models/Delivery'
import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'
import { JWTAuthTokenProvider } from '@shared/providers/AuthTokenProvider/JWTAuthTokenProvider'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import app from '@main/http/app'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { User } from '@domain/User'
import { DeliveryMapper } from '@infra/typeorm/mappers/DeliveryMapper'
import { Delivery } from '@domain/Delivery'
import { StartDeliveryUseCase } from '@useCases/StartDelivery/StartDeliveryUseCase'
import { getRandomIntegerInRange } from '@shared/utils/getRandomIntegerInRange'

const authTokenProvider = new JWTAuthTokenProvider()

let accessToken = ''
let user: User
let delivery: Delivery
let deliveryRepository: Repository<TypeOrmDeliveryModel>

describe('DeliveryRouter', () => {
  beforeAll(async () => {
    await TypeOrmHelper.connect()
  })

  afterAll(async () => {
    await TypeOrmHelper.clear()
    await TypeOrmHelper.disconnect()
  })

  beforeEach(async () => {
    await TypeOrmHelper.clear()

    user = UserTestFactory.create()
    const repository = getRepository(TypeOrmUserModel)
    await repository.save(repository.create(UserMapper.toRepository(user)))

    delivery = DeliveryTestFactory.createWithGivenUser(user)
    deliveryRepository = getRepository(TypeOrmDeliveryModel)
    await deliveryRepository.save(
      deliveryRepository.create(DeliveryMapper.toRepository(delivery))
    )

    accessToken = authTokenProvider.generate(user.id.value)
  })

  describe('POST /deliveries', () => {
    it('should return 201 on success', async () => {
      await request(app)
        .post('/deliveries')
        .set('authorization', `Bearer ${accessToken}`)
        .send({
          deliveryManId: user.id.value,
          recipientName: delivery.recipientName.value,
          productName: delivery.productName.value,
          address: delivery.address.address,
          postalCode: delivery.address.postalCode.value,
          neighborhood: delivery.address.neighborhood,
          complement: delivery.address.complement,
          number: delivery.address.number,
          city: delivery.address.city,
          state: delivery.address.state
        })
        .expect(201)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/deliveries')
        .send({
          deliveryManId: user.id.value,
          recipientName: delivery.recipientName.value,
          productName: delivery.productName.value,
          address: delivery.address.address,
          postalCode: delivery.address.postalCode.value,
          neighborhood: delivery.address.neighborhood,
          complement: delivery.address.complement,
          number: delivery.address.number,
          city: delivery.address.city,
          state: delivery.address.state
        })
        .expect(403)
    })
  })

  describe('PUT /deliveries', () => {
    it('should return 204 on success', async () => {
      await request(app)
        .put(`/deliveries/${delivery.id.value}`)
        .set('authorization', `Bearer ${accessToken}`)
        .send({
          deliveryManId: user.id.value,
          deliveryId: delivery.id.value,
          recipientName: delivery.recipientName.value,
          productName: delivery.productName.value,
          address: delivery.address.address,
          postalCode: delivery.address.postalCode.value,
          neighborhood: delivery.address.neighborhood,
          complement: delivery.address.complement,
          number: delivery.address.number,
          city: delivery.address.city,
          state: delivery.address.state
        })
        .expect(204)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .put(`/deliveries/${delivery.id.value}`)
        .send({
          deliveryManId: user.id.value,
          deliveryId: delivery.id.value,
          recipientName: delivery.recipientName.value,
          productName: delivery.productName.value,
          address: delivery.address.address,
          postalCode: delivery.address.postalCode.value,
          neighborhood: delivery.address.neighborhood,
          complement: delivery.address.complement,
          number: delivery.address.number,
          city: delivery.address.city,
          state: delivery.address.state
        })
        .expect(403)
    })
  })

  describe('DELETE /deliveries', () => {
    it('should return 204 on success', async () => {
      await request(app)
        .delete(`/deliveries/${delivery.id.value}`)
        .set('authorization', `Bearer ${accessToken}`)
        .send()
        .expect(204)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .delete(`/deliveries/${delivery.id.value}`)
        .send()
        .expect(403)
    })
  })

  describe('POST deliveries/start', () => {
    const allowedHourToStartTheDelivery = getRandomIntegerInRange(
      StartDeliveryUseCase.MIN_HOUR_ALLOWED_TO_START_DELIVERY,
      StartDeliveryUseCase.MAX_HOUR_ALLOWED_TO_START_DELIVERY
    )

    it('should return 204 on success', async () => {
      jest
        .spyOn(Date.prototype, 'getHours')
        .mockImplementation(() => allowedHourToStartTheDelivery)

      await request(app)
        .post(`/deliveries/${delivery.id.value}/start`)
        .set('authorization', `Bearer ${accessToken}`)
        .send()
        .expect(204)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .post(`/deliveries/${delivery.id.value}/start`)
        .send()
        .expect(403)
    })
  })

  describe('POST deliveries/finalize', () => {
    it('should return 204 on success', async () => {
      delivery.defineStartDateAsNow()

      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      await request(app)
        .post(`/deliveries/${delivery.id.value}/finalize`)
        .set('authorization', `Bearer ${accessToken}`)
        .send()
        .expect(204)
    })

    it('should return 204 on success (sending image)', async () => {
      delivery.defineStartDateAsNow()

      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      const testImage = path.resolve(
        __dirname,
        '..',
        'assets',
        'test_image.png'
      )

      await request(app)
        .post(`/deliveries/${delivery.id.value}/finalize`)
        .set('authorization', `Bearer ${accessToken}`)
        .attach('image', testImage)
        .expect(204)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app)
        .post(`/deliveries/${delivery.id.value}/finalize`)
        .send()
        .expect(403)
    })
  })

  describe('GET deliveries/neighborhoods', () => {
    it('should return 200 on success', async () => {
      await request(app)
        .get(`/deliveries/neighborhoods`)
        .set('authorization', `Bearer ${accessToken}`)
        .send({
          neighborhood: delivery.address.neighborhood
        })
        .expect(200)
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app).get(`/deliveries/neighborhoods`).send().expect(403)
    })
  })

  describe('GET deliveries/:deliveryId', () => {
    it('should return 200 on success', async () => {
      await request(app)
        .get(`/deliveries/${delivery.id.value}`)
        .set('authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)
        .then(response => {
          expect(response.body).toHaveProperty('id')
        })
    })

    it('should return 403 if no access token is provided', async () => {
      await request(app).get(`/deliveries/neighborhoods`).send().expect(403)
    })
  })
})
