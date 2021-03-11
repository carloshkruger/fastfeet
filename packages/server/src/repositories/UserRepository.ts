import { User } from '../domain/User'

interface UserRepository {
  save(user: User): Promise<void>
  findById(userId: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findByCpf(cpf: string): Promise<User | undefined>
}

export { UserRepository }
