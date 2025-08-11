import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAssetsTable1791670000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'assets',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'serial',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'location_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'assets',
      new TableForeignKey({
        columnNames: ['location_id'],
        referencedTableName: 'locations',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('assets');
    if (!table) {
      throw new Error("Table 'assets' not found");
    }

    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('location_id') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('assets', foreignKey);
    }
    
    await queryRunner.dropTable('assets');
  }
}
