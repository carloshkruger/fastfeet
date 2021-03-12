import { ValueObject } from '@core/domain'
import { FieldRequiredError } from '@core/errors'
import { isEmpty } from '@shared/utils/String'

interface DeliveryRecipientNameProps {
  value: string
}

class DeliveryRecipientName extends ValueObject<DeliveryRecipientNameProps> {
  private constructor(props: DeliveryRecipientNameProps) {
    super(props)
  }

  public static create(
    props: DeliveryRecipientNameProps
  ): DeliveryRecipientName {
    if (isEmpty(props.value)) {
      throw new FieldRequiredError('Recipient name')
    }

    props.value = props.value.trim()

    return new DeliveryRecipientName(props)
  }
}

export { DeliveryRecipientName }
