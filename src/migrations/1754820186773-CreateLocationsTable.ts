import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLocationsTable1754820186773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name: "locations",
                        columns: [
                            {
                                name: "id",
                                type: "int",
                                isPrimary: true,
                                isGenerated: true,
                                generationStrategy: "increment",
                            },
                            {
                                name: "name",
                                type: "varchar",
                                length: "255",
                                isNullable: false,
                            },
                            {
                                name: "organization_id",
                                type: "int",
                                isNullable: false,
                            },
                            {
                                name: "status",
                                type: "varchar",
                                length: "50",
                                isNullable: false,
                            },
                        ],
                    })
                );
        
                await queryRunner.query(`
                    INSERT INTO locations (id, name, organization_id, status) VALUES
                    (1, 'Da Nang', 1, 'actived'),
                    (2, 'Ha Noi', 1, 'unactive'),
                    (3, 'Ho Chi Minh', 1, 'actived'),
                    (4, 'Nha Trang', 2, 'actived'),
                    (5, 'Can Tho', 2, 'actived')
                  `);
        
                await queryRunner.createForeignKey(
                    "locations",
                    new TableForeignKey({
                        columnNames: ["organization_id"],
                        referencedTableName: "organizations",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    })
                );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("locations");
    }

}
