import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddPenaltyToUsersTable1696489456328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "users",
            [
                new TableColumn({
                    name: "penalty",
                    type: "boolean",
                    default: false,
                }),
                new TableColumn({
                    name: "penalty_until",
                    type: "timestamp",
                    isNullable: true,
                },)
            ],
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("users", ["penalty", "penalty_until"])
    }

}
