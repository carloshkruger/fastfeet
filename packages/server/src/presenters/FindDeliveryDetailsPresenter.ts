import { FindDeliveryDetailsResponse } from '@useCases/FindDeliveryDetails/FindDeliveryDetailsResponse'

interface FindDeliveryDetailsPresenterResponse {
  id: string
  recipientName: string
  address: {
    address: string
    number: number
    neighborhood: string
    city: string
    state: string
    postalCode: string
  }
  isInitialized: boolean
  isFinished: boolean
  statusDescription: string
  postDate: string
  initializedDate: string
  finishedDate: string
}

class FindDeliveryDetailsPresenter {
  transform({
    delivery
  }: FindDeliveryDetailsResponse): FindDeliveryDetailsPresenterResponse {
    return {
      id: delivery.id.value,
      recipientName: delivery.recipientName.value,
      address: {
        address: delivery.address.address,
        city: delivery.address.city,
        neighborhood: delivery.address.neighborhood,
        number: delivery.address.number,
        postalCode: delivery.address.postalCode.value,
        state: delivery.address.state
      },
      isInitialized: delivery.isInitialized(),
      isFinished: delivery.isFinished(),
      initializedDate: delivery.startDate?.toLocaleDateString('pt-BR') || '',
      finishedDate: delivery.endDate?.toLocaleDateString('pt-BR') || '',
      postDate: '',
      statusDescription: delivery.getStatusDescription()
    }
  }
}

export { FindDeliveryDetailsPresenter }
