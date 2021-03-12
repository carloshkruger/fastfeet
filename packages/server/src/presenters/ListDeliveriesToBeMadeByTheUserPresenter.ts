import { Presenter } from '@core/presenter'
import { ListDeliveriesToBeMadeByTheUserResponse } from '@useCases/ListDeliveriesToBeMadeByTheUser/ListDeliveriesToBeMadeByTheUserResponse'

interface Response {
  deliveryId: string
  recipientName: string
  productName: string
  address: {
    address: string
    number: number
    neighborhood: string
    city: string
    state: string
    postalCode: string
  }
}

class ListDeliveriesToBeMadeByTheUserPresenter extends Presenter<Response[]> {
  transform(data: ListDeliveriesToBeMadeByTheUserResponse): Response[] {
    return data.deliveries.map(delivery => ({
      deliveryId: delivery.id.value,
      recipientName: delivery.recipientName.value,
      productName: delivery.productName.value,
      address: {
        address: delivery.address.address,
        city: delivery.address.city,
        neighborhood: delivery.address.neighborhood,
        number: delivery.address.number,
        postalCode: delivery.address.postalCode.value,
        state: delivery.address.state
      }
    }))
  }
}

export { ListDeliveriesToBeMadeByTheUserPresenter }
