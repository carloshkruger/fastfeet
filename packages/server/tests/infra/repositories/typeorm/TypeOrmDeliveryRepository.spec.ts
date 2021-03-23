import { TypeOrmDeliveryRepository } from '@infra/repositories/typeorm/TypeOrmDeliveryRepository'
import { UserMapper } from '@infra/typeorm/mappers/UserMapper'
import { User } from '@infra/typeorm/models/User'
import { Delivery as TypeOrmDeliveryModel } from '@infra/typeorm/models/Delivery'
import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { getRepository } from 'typeorm'
import { DeliveryMapper } from '@infra/typeorm/mappers/DeliveryMapper'
import { Delivery } from '@domain/Delivery'
import { UniqueEntityId } from '@core/domain'

const typeormDeliveryRepository = new TypeOrmDeliveryRepository()

describe('TypeOrmUserRepository', () => {
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

  describe('save()', () => {
    it('should save a delivery', async () => {
      const user = UserTestFactory.create()

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      await expect(
        typeormDeliveryRepository.save(
          DeliveryTestFactory.createWithGivenUser(user)
        )
      ).resolves.not.toThrow()
    })
  })

  describe('findById()', () => {
    it('should return a delivery', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      await expect(
        typeormDeliveryRepository.findById(delivery.id)
      ).resolves.toBeInstanceOf(Delivery)
    })

    it('should return undefined if delivery does not exists', async () => {
      await expect(
        typeormDeliveryRepository.findById(new UniqueEntityId())
      ).resolves.toBeFalsy()
    })
  })

  describe('findByUserIdAndDate()', () => {
    it('should return an array of delivery', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)

      delivery.defineStartDateAsNow()

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      const response = await typeormDeliveryRepository.findByUserIdAndStartDeliveryDate(
        user.id,
        new Date()
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBeInstanceOf(Delivery)
    })

    it('should return an empty array if conditions does not match with any register', async () => {
      const response = await typeormDeliveryRepository.findByUserIdAndStartDeliveryDate(
        new UniqueEntityId(),
        new Date()
      )

      expect(response).toHaveLength(0)
    })
  })

  describe('listDeliveriesToBeMadeByUserId()', () => {
    it('should return an array of delivery', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      const response = await typeormDeliveryRepository.listDeliveriesToBeMadeByUserId(
        user.id
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBeInstanceOf(Delivery)
    })

    it('should filter deliveries by the neighborhood', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      const response = await typeormDeliveryRepository.listDeliveriesToBeMadeByUserId(
        user.id,
        delivery.address.neighborhood
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBeInstanceOf(Delivery)

      const response2 = await typeormDeliveryRepository.listDeliveriesToBeMadeByUserId(
        user.id,
        delivery.address.neighborhood.toUpperCase()
      )

      expect(response2).toHaveLength(1)
      expect(response2[0]).toBeInstanceOf(Delivery)

      const response3 = await typeormDeliveryRepository.listDeliveriesToBeMadeByUserId(
        user.id,
        'another neighborhood that does not exists on database'
      )

      expect(response3).toHaveLength(0)
    })

    it('should not return the deliveries already finilized or canceled', async () => {
      const user = UserTestFactory.create()

      const deliveryAlreadyFinilized = DeliveryTestFactory.createWithGivenUser(
        user
      )
      deliveryAlreadyFinilized.defineStartDateAsNow()
      deliveryAlreadyFinilized.defineEndDateAsNow()

      const deliveryCanceled = DeliveryTestFactory.createWithGivenUser(user)
      deliveryCanceled.defineCanceledAtAsNow()

      const deliveryToBeMade = DeliveryTestFactory.createWithGivenUser(user)

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(
        DeliveryMapper.toRepository(deliveryAlreadyFinilized)
      )
      await deliveryRepository.save(
        DeliveryMapper.toRepository(deliveryCanceled)
      )
      await deliveryRepository.save(
        DeliveryMapper.toRepository(deliveryToBeMade)
      )

      const response = await typeormDeliveryRepository.listDeliveriesToBeMadeByUserId(
        user.id
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBeInstanceOf(Delivery)
    })

    it('should return an empty array if conditions does not match with any register', async () => {
      const response = await typeormDeliveryRepository.listDeliveriesToBeMadeByUserId(
        new UniqueEntityId()
      )

      expect(response).toHaveLength(0)
    })
  })

  describe('listDeliveriesAlreadyMadeByUserId()', () => {
    it('should return an array of delivery', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)
      delivery.defineStartDateAsNow()
      delivery.defineEndDateAsNow()

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      const response = await typeormDeliveryRepository.listDeliveriesAlreadyMadeByUserId(
        user.id
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBeInstanceOf(Delivery)
    })

    it('should filter deliveries by the neighborhood', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)
      delivery.defineStartDateAsNow()
      delivery.defineEndDateAsNow()

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      const response = await typeormDeliveryRepository.listDeliveriesAlreadyMadeByUserId(
        user.id,
        delivery.address.neighborhood
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBeInstanceOf(Delivery)

      const response2 = await typeormDeliveryRepository.listDeliveriesAlreadyMadeByUserId(
        user.id,
        delivery.address.neighborhood.toUpperCase()
      )

      expect(response2).toHaveLength(1)
      expect(response2[0]).toBeInstanceOf(Delivery)

      const response3 = await typeormDeliveryRepository.listDeliveriesAlreadyMadeByUserId(
        user.id,
        'another neighborhood that does not exists on database'
      )

      expect(response3).toHaveLength(0)
    })

    it('should not return the deliveries that is not finilized yet', async () => {
      const user = UserTestFactory.create()

      const deliveryAlreadyStarted = DeliveryTestFactory.createWithGivenUser(
        user
      )
      deliveryAlreadyStarted.defineStartDateAsNow()
      deliveryAlreadyStarted.defineEndDateAsNow()

      const deliveryCanceled = DeliveryTestFactory.createWithGivenUser(user)
      deliveryCanceled.defineCanceledAtAsNow()

      const deliveryToBeMade = DeliveryTestFactory.createWithGivenUser(user)

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(
        DeliveryMapper.toRepository(deliveryAlreadyStarted)
      )
      await deliveryRepository.save(
        DeliveryMapper.toRepository(deliveryCanceled)
      )
      await deliveryRepository.save(
        DeliveryMapper.toRepository(deliveryToBeMade)
      )

      const response = await typeormDeliveryRepository.listDeliveriesAlreadyMadeByUserId(
        user.id
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBeInstanceOf(Delivery)
    })

    it('should return an empty array if conditions does not match with any register', async () => {
      const response = await typeormDeliveryRepository.listDeliveriesAlreadyMadeByUserId(
        new UniqueEntityId()
      )

      expect(response).toHaveLength(0)
    })
  })

  describe('deleteById()', () => {
    it('should delete a delivery', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      await expect(
        typeormDeliveryRepository.deleteById(delivery.id)
      ).resolves.not.toThrow()
    })
  })

  describe('findAllNeighborhoodsLinkedToDeliveryMan()', () => {
    it('should return a neighborhood list', async () => {
      const user = UserTestFactory.create()
      const delivery = DeliveryTestFactory.createWithGivenUser(user)

      const userRepository = getRepository(User)
      await userRepository.save(UserMapper.toRepository(user))

      const deliveryRepository = getRepository(TypeOrmDeliveryModel)
      await deliveryRepository.save(DeliveryMapper.toRepository(delivery))

      const response = await typeormDeliveryRepository.findAllNeighborhoodsLinkedToDeliveryMan(
        {
          deliveryManId: user.id.value,
          neighborhood: delivery.address.neighborhood
        }
      )

      expect(response).toHaveLength(1)
      expect(response[0]).toBe(delivery.address.neighborhood)
    })

    it('should return an empry list if no register was found', async () => {
      const response = await typeormDeliveryRepository.findAllNeighborhoodsLinkedToDeliveryMan(
        {
          deliveryManId: new UniqueEntityId().value,
          neighborhood: ''
        }
      )

      expect(response).toHaveLength(0)
    })
  })
})
