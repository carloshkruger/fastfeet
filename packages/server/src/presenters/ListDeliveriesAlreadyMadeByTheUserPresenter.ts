import { Presenter } from '@core/presenter'
import { ListDeliveriesAlreadyMadeByTheUserResponse } from '@useCases/ListDeliveriesAlreadyMadeByTheUser/ListDeliveriesAlreadyMadeByTheUserResponse'

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

class ListDeliveriesAlreadyMadeByTheUserPresenter extends Presenter<
  Response[]
> {
  transform(data: ListDeliveriesAlreadyMadeByTheUserResponse): Response[] {
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

export { ListDeliveriesAlreadyMadeByTheUserPresenter }
