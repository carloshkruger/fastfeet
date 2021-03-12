import { FieldRequiredError } from '@core/errors'
import { DeliveryRecipientName } from '@domain/DeliveryRecipientName'

describe('DeliveryRecipientName validation', () => {
  it('should not be possible to create a DeliveryRecipientName instance with invalid value', () => {
    expect(() => DeliveryRecipientName.create({ value: '' })).toThrow(
      new FieldRequiredError('Recipient name')
    )

    expect(() => DeliveryRecipientName.create({ value: '    ' })).toThrow(
      new FieldRequiredError('Recipient name')
    )
  })

  it('should create a DeliveryRecipientName instance with valid value', () => {
    expect(
      DeliveryRecipientName.create({ value: 'valid recipient name' })
    ).toBeInstanceOf(DeliveryRecipientName)
  })
})
