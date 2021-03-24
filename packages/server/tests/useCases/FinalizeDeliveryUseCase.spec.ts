import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { Delivery } from '@domain/Delivery'
import { InMemoryDeliveryRepository } from '@infra/repositories/InMemory/InMemoryDeliveryRepository'
import { InMemoryUserRepository } from '@infra/repositories/InMemory/InMemoryUserRepository'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { FakeStorageProvider } from '@shared/providers/StorageProvider/FakeStorageProvider'
import { StorageProvider } from '@shared/providers/StorageProvider/StorageProvider'
import { DeliveryTestFactory } from '@tests/factories/domain/DeliveryTestFactory'
import { UserTestFactory } from '@tests/factories/domain/UserTestFactory'
import { FinalizeDeliveryErrors } from '@useCases/FinalizeDelivery/FinalizeDeliveryErrors'
import { FinalizeDeliveryUseCase } from '@useCases/FinalizeDelivery/FinalizeDeliveryUseCase'

let inMemoryUserRepository: UserRepository
let inMemoryDeliveryRepository: DeliveryRepository
let fakeStorageProvider: StorageProvider
let finalizeDeliveryUseCase: FinalizeDeliveryUseCase

const user = UserTestFactory.create()

let delivery: Delivery

describe('FinalizeDeliveryUseCase', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    fakeStorageProvider = new FakeStorageProvider()
    finalizeDeliveryUseCase = new FinalizeDeliveryUseCase(
      inMemoryUserRepository,
      inMemoryDeliveryRepository,
      fakeStorageProvider
    )

    delivery = DeliveryTestFactory.createWithGivenUser(user)
    delivery.defineStartDateAsNow()
  })

  it('should throw if no delivery man id is provided', async () => {
    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryManId: '',
        deliveryId: new UniqueEntityId().value
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery man id'))
  })

  it('should throw if no delivery id is provided', async () => {
    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryManId: new UniqueEntityId().value,
        deliveryId: ''
      })
    ).rejects.toThrow(new FieldRequiredError('Delivery id'))
  })

  it('should throw if delivery man was not found', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => undefined)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: new UniqueEntityId().value
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should throw if delivery was not found', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => undefined)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: new UniqueEntityId().value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow()

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not be possible to the user finalize a delivery that is not linked to him', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryNotLinkedToTheUser = DeliveryTestFactory.create()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryNotLinkedToTheUser)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: deliveryNotLinkedToTheUser.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new FinalizeDeliveryErrors.DeliveryNotLinkedToUser())

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not be possible to the user finalize a delivery that is not initialized', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    const deliveryNotInitialized = DeliveryTestFactory.createWithGivenUser(user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => deliveryNotInitialized)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: deliveryNotInitialized.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow(new FinalizeDeliveryErrors.DeliveryNotInitialized())

    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should be possible to the user finalize a delivery without signature image', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')
    const saveFileSpy = jest.spyOn(fakeStorageProvider, 'saveFile')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value
      })
    ).resolves.not.toThrow()

    const paramPassedToSaveMethod: Delivery = saveSpy.mock.calls[0][0]

    expect(saveSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).not.toHaveBeenCalled()
    expect(paramPassedToSaveMethod.id.value).toBe(delivery.id.value)
    expect(paramPassedToSaveMethod.endDate).toBeInstanceOf(Date)
    expect(paramPassedToSaveMethod.signatureImage).toBeFalsy()
  })

  it('should be possible to the user finalize a delivery with client signature image', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')
    const saveFileSpy = jest.spyOn(fakeStorageProvider, 'saveFile')

    const signatureImage = 'signature_image.jpg'

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value,
        signatureImage
      })
    ).resolves.not.toThrow()

    const paramPassedToSaveMethod: Delivery = saveSpy.mock.calls[0][0]

    expect(saveSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileName: signatureImage,
      filePath: ['signatures']
    })
    expect(paramPassedToSaveMethod.id.value).toBe(delivery.id.value)
    expect(paramPassedToSaveMethod.endDate).toBeInstanceOf(Date)
    expect(paramPassedToSaveMethod.signatureImage).toBe(signatureImage)
  })

  it('should throw if try to finalize a delivery already finished', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    delivery.defineEndDateAsNow()

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const saveSpy = jest.spyOn(inMemoryDeliveryRepository, 'save')
    const saveFileSpy = jest.spyOn(fakeStorageProvider, 'saveFile')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value,
        signatureImage: ''
      })
    ).rejects.toThrow(new FinalizeDeliveryErrors.DeliveryAlreadyFinished())

    expect(saveSpy).not.toHaveBeenCalled()
    expect(saveFileSpy).not.toHaveBeenCalled()
  })

  it('should throw if DeliveryRepository throws', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    jest
      .spyOn(inMemoryDeliveryRepository, 'save')
      .mockImplementation(async () => {
        throw new Error()
      })

    const deleteFileSpy = jest.spyOn(fakeStorageProvider, 'deleteFile')

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value
      })
    ).rejects.toThrow()

    expect(deleteFileSpy).not.toHaveBeenCalled()
  })

  it('should delete the signature image and throw if the "save" method of DeliveryRepository throws', async () => {
    jest
      .spyOn(inMemoryUserRepository, 'findById')
      .mockImplementation(async () => user)

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    jest
      .spyOn(inMemoryDeliveryRepository, 'save')
      .mockImplementation(async () => {
        throw new Error()
      })

    const deleteFileSpy = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const signatureImage = 'signature_image.jpg'

    await expect(
      finalizeDeliveryUseCase.execute({
        deliveryId: delivery.id.value,
        deliveryManId: user.id.value,
        signatureImage
      })
    ).rejects.toThrow()

    expect(deleteFileSpy).toHaveBeenCalledTimes(1)
    expect(deleteFileSpy).toHaveBeenCalledWith({
      fileName: signatureImage,
      filePath: ['signatures']
    })
  })
})
