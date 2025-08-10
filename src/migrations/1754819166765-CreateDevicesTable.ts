import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDevicesTable1754818100000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "devices",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "devices",
            new TableForeignKey({
                columnNames: ["organization_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "organizations",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("devices");
        if (!table) {
            throw new Error("Table 'devices' not found");
          }
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("organization_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("devices", foreignKey);
        }
        await queryRunner.dropTable("devices");
    }
}
