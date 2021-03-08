import { UniqueEntityId } from './UniqueEntityId'

abstract class Entity<T> {
  private _id: UniqueEntityId

  protected props: T

  constructor(props: T, id?: UniqueEntityId) {
    this.props = props

    this._id = id || new UniqueEntityId()
  }

  get id(): UniqueEntityId {
    return this._id
  }
}

export { Entity }
