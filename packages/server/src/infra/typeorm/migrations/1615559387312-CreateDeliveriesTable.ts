import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDeliveriesTable1615559387312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deliveries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'delivery_man_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'product_name',
            type: 'varchar'
          },
          {
            name: 'recipient_name',
            type: 'varchar'
          },
          {
            name: 'address',
            type: 'varchar'
          },
          {
            name: 'neighborhood',
            type: 'varchar'
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'state',
            type: 'varchar'
          },
          {
            name: 'postal_code',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'signature_image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'canceled_at',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp'
          },
          {
            name: 'updated_at',
            type: 'timestamp'
          }
        ],
        foreignKeys: [
          {
            name: 'users',
            columnNames: ['delivery_man_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deliveries')
  }
}
