import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany
} from 'typeorm'
import { Delivery } from './Delivery'

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  cpf: string

  @Column({ name: 'is_admin', type: 'boolean' })
  isAdmin: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Delivery, delivery => delivery.user)
  deliveries: Delivery[]
}

export { User }
