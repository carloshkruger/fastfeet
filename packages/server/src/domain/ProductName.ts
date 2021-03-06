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
    if (isEmpty(props.value)) {
      throw new FieldRequiredError('Product name')
    }

    props.value = props.value.trim()

    return new ProductName(props)
  }

  get value(): string {
    return this.props.value
  }
}

export { ProductName }
