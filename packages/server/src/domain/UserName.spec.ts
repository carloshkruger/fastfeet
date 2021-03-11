import { FieldRequiredError } from '../core/errors/FieldRequiredError'
import { UserName } from './UserName'

describe('UserName validation', () => {
  it('should not create a UserName instance with invalid value (empty string)', () => {
    const invalidName = ''

    expect(() => UserName.create({ value: invalidName })).toThrow(
      FieldRequiredError
    )
  })

  it('should create a UserName instance with valid value', () => {
    const validName = 'valid_name'

    const userName = UserName.create({ value: validName })

    expect(userName).toBeInstanceOf(UserName)
    expect(userName.value).toBe(validName)
  })
})
