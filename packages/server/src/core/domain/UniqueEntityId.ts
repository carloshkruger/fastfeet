import { v4 } from 'uuid'

class UniqueEntityId {
  private id: string

  constructor(id?: string) {
    this.id = id || v4()
  }

  get value(): string {
    return this.id
  }
}

export { UniqueEntityId }
