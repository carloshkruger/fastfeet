import { ProductName } from './ProductName'

describe('ProductName validation', () => {
  it('should throw if empty value is provided', () => {
    expect(() => ProductName.create({ value: '' })).toThrow()
  })

  it('should throw if blank string is provided', () => {
    expect(() => ProductName.create({ value: '   ' })).toThrow()
  })

  it('should create an instance of ProductName if valid values is provided', () => {
    expect(ProductName.create({ value: 'valid product name' })).toBeInstanceOf(
      ProductName
    )
  })
})
