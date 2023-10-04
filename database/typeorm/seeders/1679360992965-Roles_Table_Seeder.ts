import { Role } from "../../../src/core/common/database/typeorm/entities/role";
import { MigrationInterface, QueryRunner } from "typeorm"

export class RolesTableSeeder1679360992965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roles: Partial<Role>[] = [
            new Role({
                name: 'root',
            }),
            new Role({
                name: 'member',
            })
        ];

        await queryRunner.connection
            .getRepository(Role)
            .insert(roles);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.connection
            .createQueryBuilder()
            .delete()
            .from(Role)
            .execute()
    }

}
