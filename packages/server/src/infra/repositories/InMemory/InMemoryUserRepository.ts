import { User } from '../../../domain/User'
import { UserRepository } from '../../../repositories/UserRepository'

class InMemoryUserRepository implements UserRepository {
  private data: User[] = []

  async save(user: User): Promise<void> {
    this.data.push(user)
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.data.find(user => user.id.value === userId)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.data.find(user => user.email.value === email)

    return user
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = this.data.find(user => user.cpf.value === cpf)

    return user
  }
}

export { InMemoryUserRepository }
