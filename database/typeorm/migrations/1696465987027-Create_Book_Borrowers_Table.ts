import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { dateColumn } from "../general-column.migration";

export class CreateBookBorrowersTable1696465987027 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "book_borrowers",
                columns: [
                    {
                        name: "borrower_id",
                        length: "16",
                        isNullable: true,
                        type: "varchar",
                    },
                    {
                        name: "book_id",
                        length: "16",
                        isNullable: true,
                        type: "varchar",
                    },
                    {
                        name: "status",
                        length: "191",
                        isNullable: false,
                        type: "varchar",
                    },
                    {
                        name: "borrowed_at",
                        type: "timestamp",
                        isNullable: true,
                        default: "now()",
                    },
                    {
                        name: "returned_at",
                        type: "timestamp",
                        isNullable: true,
                        default: "now()",
                    },
                    ...dateColumn(false),
                ],
                foreignKeys: [
                    {
                        columnNames: ["borrower_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        columnNames: ["book_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "books",
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ]
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("book_borrowers");
    }

}
