import { User } from '../domain/User'

interface UserRepository {
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findByCpf(cpf: string): Promise<User | null>
}

export { UserRepository }
