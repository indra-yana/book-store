import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { idColumn, dateColumn } from "../general-column.migration";

export class CreateBooksTable1696409544763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "books",
                columns: [
                    ...idColumn,
                    {
                        name: "code",
                        length: "16",
                        isNullable: false,
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "title",
                        length: "255",
                        isNullable: false,
                        type: "varchar",
                    },
                    {
                        name: "author",
                        length: "255",
                        isNullable: true,
                        type: "varchar",
                    },
                    {
                        name: "stock",
                        type: "int",
                        default: 0,
                    },
                    {
                        name: "borrowed",
                        type: "int",
                        default: 0,
                    },
                    ...dateColumn(),
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books");
    }

}
