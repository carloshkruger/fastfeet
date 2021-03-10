import { UniqueEntityId } from '../../core/domain/UniqueEntityId'
import { Address } from '../../domain/Address'
import { CEP } from '../../domain/CEP'
import { Delivery } from '../../domain/Delivery'
import { ProductName } from '../../domain/ProductName'
import { InMemoryDeliveryRepository } from '../../infra/repositories/InMemory/InMemoryDeliveryRepository'
import { DeliveryRepository } from '../../repositories/DeliveryRepository'
import { DeleteDeliveryUseCase } from './DeleteDeliveryUseCase'

let inMemoryDeliveryRepository: DeliveryRepository
let deleteDeliveryUseCase: DeleteDeliveryUseCase

describe('DeleteDeliveryUseCase', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    deleteDeliveryUseCase = new DeleteDeliveryUseCase(
      inMemoryDeliveryRepository
    )
  })

  it('should throw if no delivery id is provided', async () => {
    await expect(
      deleteDeliveryUseCase.execute({
        deliveryId: ''
      })
    ).rejects.toThrow()
  })

  it('should throw if delivery was not found', async () => {
    await expect(
      deleteDeliveryUseCase.execute({
        deliveryId: new UniqueEntityId().value
      })
    ).rejects.toThrow()
  })

  it('should delete a delivery', async () => {
    const delivery = Delivery.create({
      deliveryManId: new UniqueEntityId(),
      productName: ProductName.create({ value: 'valid product name' }),
      address: Address.create({
        address: 'valid address',
        postalCode: CEP.create({ value: '89186000' }),
        number: 9999,
        neighborhood: 'valid neighborhood',
        city: 'valid city',
        state: 'valid state'
      }),
      startDate: new Date()
    })

    jest
      .spyOn(inMemoryDeliveryRepository, 'findById')
      .mockImplementation(async () => delivery)

    const deleteByIdSpy = jest.spyOn(inMemoryDeliveryRepository, 'deleteById')

    await expect(
      deleteDeliveryUseCase.execute({
        deliveryId: delivery.id.value
      })
    ).resolves.not.toThrow()

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1)
    expect(deleteByIdSpy).toHaveBeenCalledWith(delivery.id)
  })
})
