import { Presenter } from '@core/presenter'
import { CreateDeliveryResponse } from '@useCases/CreateDelivery/CreateDeliveryResponse'

interface CreateDeliveryPresenterResponse {
  id: string
}

class CreateDeliveryPresenter extends Presenter<CreateDeliveryPresenterResponse> {
  transform({
    delivery
  }: CreateDeliveryResponse): CreateDeliveryPresenterResponse {
    return {
      id: delivery.id.value
    }
  }
}

export { CreateDeliveryPresenter }
