import { MigrationInterface, Not, QueryRunner } from "typeorm"
import { User } from "../../../src/core/common/database/typeorm/entities/user";
import { Role } from "../../../src/core/common/database/typeorm/entities/role";

export class UserRolesTableSeeder1679361514737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Seed root user
        const rootUser = await queryRunner.connection
            .getRepository(User)
            .findOne({
                where: {
                    username: 'root',
                },
                relations: {
                    roles: true,
                }
            });

        const roleRoot = await queryRunner.connection
            .getRepository(Role)
            .findOneBy({
                name: 'root'
            });

        rootUser.roles = [
            ...rootUser.roles,
            roleRoot
        ];

        await queryRunner.connection
            .getRepository(User)
            .save(rootUser);


        // Seed member user
        const memberUsers = await queryRunner.connection
                .getRepository(User)
                .find({
                    where: {
                        username: Not('root'),
                    },
                    relations: {
                        roles: true,
                    }
                });

        const roleMember = await queryRunner.connection
                .getRepository(Role)
                .findOneBy({
                    name: 'member'
                });
        
        for (let index = 0; index < memberUsers.length; index++) {
            const user = memberUsers[index];
            user.roles = [
                ...user.roles,
                roleMember
            ];
    
            await queryRunner.connection
                .getRepository(User)
                .save(user);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const role = await queryRunner.connection
            .getRepository(Role)
            .findOneBy({
                name: 'root'
            });

        const role_id = role.id;
        const rootUser = await queryRunner.connection
            .getRepository(User)
            .findOne({
                where: {
                    username: 'root',
                },
                relations: {
                    roles: true,
                }
            });

        rootUser.roles = rootUser.roles.filter((role) => role.id !== role_id);
        await queryRunner.connection
            .getRepository(User)
            .save(rootUser);
    }

}
