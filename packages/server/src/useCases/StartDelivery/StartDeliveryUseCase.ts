import { UniqueEntityId } from '@core/domain/UniqueEntityId'
import { UseCase } from '@core/domain/UseCase'
import { AppError } from '@core/errors/AppError'
import { FieldRequiredError } from '@core/errors/FieldRequiredError'
import { DeliveryRepository } from '@repositories/DeliveryRepository'
import { UserRepository } from '@repositories/UserRepository'
import { isEmpty } from '@shared/utils/String'
import { StartDeliveryErrors } from './StartDeliveryErrors'
import { StartDeliveryRequest } from './StartDeliveryRequest'

class StartDeliveryUseCase implements UseCase<StartDeliveryRequest, void> {
  public static MIN_HOUR_ALLOWED_TO_START_DELIVERY = 8
  public static MAX_HOUR_ALLOWED_TO_START_DELIVERY = 12
  public static MAX_DELIVERIES_PER_USER_PER_DAY = 5

  constructor(
    private userRepository: UserRepository,
    private deliveryRepository: DeliveryRepository
  ) {}

  async execute({
    deliveryManId,
    deliveryId
  }: StartDeliveryRequest): Promise<void> {
    if (isEmpty(deliveryManId)) {
      throw new FieldRequiredError('Delivery man id')
    }

    if (isEmpty(deliveryId)) {
      throw new FieldRequiredError('Delivery id')
    }

    const deliveryMan = await this.userRepository.findById(deliveryManId)

    if (!deliveryMan) {
      throw new AppError('Delivery man not found.')
    }

    const delivery = await this.deliveryRepository.findById(
      new UniqueEntityId(deliveryManId)
    )

    if (!delivery) {
      throw new AppError('Delivery not found.')
    }

    if (delivery.deliveryManId.value !== deliveryMan.id.value) {
      throw new StartDeliveryErrors.DeliveryNotLinkedToUser()
    }

    const currentDate = new Date()
    const currentHour = currentDate.getHours()

    if (
      currentHour < StartDeliveryUseCase.MIN_HOUR_ALLOWED_TO_START_DELIVERY ||
      currentHour >= StartDeliveryUseCase.MAX_HOUR_ALLOWED_TO_START_DELIVERY
    ) {
      throw new StartDeliveryErrors.TimeNotAllowed()
    }

    const deliveriesMadeByUserToday = await this.deliveryRepository.findByUserIdAndDate(
      deliveryMan.id,
      currentDate
    )

    if (
      deliveriesMadeByUserToday.length >=
      StartDeliveryUseCase.MAX_DELIVERIES_PER_USER_PER_DAY
    ) {
      throw new StartDeliveryErrors.MaxDeliveriesReached()
    }

    delivery.defineStartDateAsNow()

    await this.deliveryRepository.save(delivery)
  }
}

export { StartDeliveryUseCase }
