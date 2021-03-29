import { CreateDeliveryResponse } from '@useCases/CreateDelivery/CreateDeliveryResponse'

interface CreateDeliveryPresenterResponse {
  id: string
}

class CreateDeliveryPresenter {
  transform({
    delivery
  }: CreateDeliveryResponse): CreateDeliveryPresenterResponse {
    return {
      id: delivery.id.value
    }
  }
}

export { CreateDeliveryPresenter }
