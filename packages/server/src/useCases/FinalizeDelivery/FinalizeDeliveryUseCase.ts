import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { UseCase } from '@core/domain/UseCase'
import { NotFoundError } from '@core/errors'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { StorageProvider } from '@shared/providers/StorageProvider/StorageProvider'
import { isEmpty } from '@shared/utils/String'
import { FinalizeDeliveryErrors } from './FinalizeDeliveryErrors'
import { FinalizeDeliveryRequest } from './FinalizeDeliveryRequest'

class FinalizeDeliveryUseCase
  implements UseCase<FinalizeDeliveryRequest, void> {
  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute({
    deliveryManId,
    deliveryId,
    signatureImage
  }: FinalizeDeliveryRequest): Promise<void> {
    if (isEmpty(deliveryManId)) {
      throw new FieldRequiredError('Delivery man id')
    }

    if (isEmpty(deliveryId)) {
      throw new FieldRequiredError('Delivery id')
    }

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new NotFoundError('Delivery man was not found.')
    }

    const delivery = await this.deliveryRepository.findById(
      new UniqueEntityId(deliveryId)
    )

    if (!delivery) {
      throw new NotFoundError('Delivery not found.')
    }

    if (delivery.deliveryManId.value !== deliveryMan.id.value) {
      throw new FinalizeDeliveryErrors.DeliveryNotLinkedToUser()
    }

    if (!delivery.isInitialized()) {
      throw new FinalizeDeliveryErrors.DeliveryNotInitialized()
    }

    delivery.defineEndDateAsNow()

    const hasSignatureImage = !isEmpty(signatureImage)
    const saveFileParam = {
      fileName: signatureImage || '',
      filePath: ['signatures']
    }

    if (hasSignatureImage) {
      delivery.setSignatureImage(String(signatureImage))

      await this.storageProvider.saveFile(saveFileParam)
    }

    try {
      await this.deliveryRepository.save(delivery)
    } catch (error) {
      if (hasSignatureImage) {
        await this.storageProvider.deleteFile(saveFileParam)
      }

      throw error
    }
  }
}

export { FinalizeDeliveryUseCase }
