import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { User } from './User'

@Entity('deliveries')
class Delivery {
  @PrimaryColumn('uuid')
  id: string

  @Column({ name: 'delivery_man_id', type: 'uuid' })
  deliveryManIn: string

  @Column({ name: 'product_name' })
  productName: string

  @Column({ name: 'recipient_name' })
  recipientName: string

  @Column()
  address: string

  @Column()
  neighborhood: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  complement: string

  @Column({ name: 'postal_code' })
  postalCode: string

  @Column('integer')
  number: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => User, user => user.deliveries)
  @JoinColumn({ name: 'delivery_man_id' })
  user: User
}

export { Delivery }
