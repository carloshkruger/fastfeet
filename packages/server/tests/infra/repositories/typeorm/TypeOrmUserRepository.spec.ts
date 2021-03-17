import { UniqueEntityId } from '@core/domain'
import { User } from '@domain/User'
import { TypeOrmUserRepository } from '@infra/repositories/typeorm/TypeOrmUserRepository'
import { TypeOrmHelper } from '@infra/typeorm/TypeOrmHelper'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'

const typeormUserRepository = new TypeOrmUserRepository()

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
    it('should create an user', async () => {
      await expect(
        typeormUserRepository.save(UserTestFactory.create())
      ).resolves.not.toThrow()
    })
  })

  describe('findById()', () => {
    it('should return an user if exists', async () => {
      const user = UserTestFactory.create()

      await typeormUserRepository.save(user)

      await expect(
        typeormUserRepository.findById(user.id.value)
      ).resolves.toBeInstanceOf(User)
    })

    it('should return undefined if user does not exists', async () => {
      await expect(
        typeormUserRepository.findById(new UniqueEntityId().value)
      ).resolves.toBeFalsy()
    })
  })

  describe('findByEmail()', () => {
    it('should return an user if exists', async () => {
      const user = UserTestFactory.create()

      await typeormUserRepository.save(user)

      await expect(
        typeormUserRepository.findByEmail(user.email.value)
      ).resolves.toBeInstanceOf(User)
    })

    it('should return undefined if user does not exists', async () => {
      await expect(typeormUserRepository.findByEmail('')).resolves.toBeFalsy()
    })
  })

  describe('findByCpf()', () => {
    it('should return an user if exists', async () => {
      const user = UserTestFactory.create()

      await typeormUserRepository.save(user)

      await expect(
        typeormUserRepository.findByCpf(user.cpf.value)
      ).resolves.toBeInstanceOf(User)
    })

    it('should return undefined if user does not exists', async () => {
      await expect(typeormUserRepository.findByCpf('')).resolves.toBeFalsy()
    })
  })
})
