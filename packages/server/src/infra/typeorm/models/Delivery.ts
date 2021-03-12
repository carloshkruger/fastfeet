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

  @Column({ name: 'signature_image' })
  signatureImage: string

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date

  @Column({ name: 'canceled_at', type: 'timestamp' })
  canceledAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => User, user => user.deliveries)
  @JoinColumn({ name: 'delivery_man_id' })
  user: User
}

export { Delivery }
