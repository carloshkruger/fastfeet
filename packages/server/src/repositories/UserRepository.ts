import { User } from '../domain/User'

interface UserRepository {
  save(user: User): Promise<void>
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByCpf(cpf: string): Promise<User | null>
}

export { UserRepository }
