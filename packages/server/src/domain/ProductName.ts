import { ValueObject } from '@core/domain'
import { FieldRequiredError } from '@core/errors'
import { isEmpty } from '@shared/utils/String'

interface ProductNameProps {
  value: string
}

class ProductName extends ValueObject<ProductNameProps> {
  private constructor(props: ProductNameProps) {
    super(props)
  }

  public static create(props: ProductNameProps): ProductName {
    props.value = props.value.trim()

    if (isEmpty(props.value)) {
      throw new FieldRequiredError('Product name')
    }

    return new ProductName(props)
  }

  get value(): string {
    return this.props.value
  }
}

export { ProductName }
