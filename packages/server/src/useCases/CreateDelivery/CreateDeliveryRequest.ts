interface CreateDeliveryRequest {
  deliveryManId: string
  productName: string
  address: string
  postalCode: string
  neighborhood: string
  complement: string
  number: number
  city: string
  state: string
}

export { CreateDeliveryRequest }
