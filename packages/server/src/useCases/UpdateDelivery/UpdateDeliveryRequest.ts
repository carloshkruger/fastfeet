interface UpdateDeliveryRequest {
  deliveryId: string
  deliveryManId: string
  recipientName: string
  productName: string
  address: string
  postalCode: string
  neighborhood: string
  complement: string
  number: number
  city: string
  state: string
}

export { UpdateDeliveryRequest }
