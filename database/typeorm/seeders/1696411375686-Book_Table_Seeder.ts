import { Book } from "../../../src/core/common/database/typeorm/entities/Book";
import { MigrationInterface, QueryRunner } from "typeorm"

export class BookTableSeeder1696411375686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const books: Partial<Book>[] = [
            new Book({
                code: "JK-45",
                title: "Harry Potter",
                author: "J.K Rowling",
                stock: 1
            }),
            new Book({
                code: "SHR-1",
                title: "A Study in Scarlet",
                author: "Arthur Conan Doyle",
                stock: 1
            }),
            new Book({
                code: "TW-11",
                title: "Twilight",
                author: "Stephenie Meyer",
                stock: 1
            }),
            new Book({
                code: "HOB-83",
                title: "The Hobbit, or There and Back Again",
                author: "J.R.R. Tolkien",
                stock: 1
            }),
            new Book({
                code: "NRN-7",
                title: "The Lion, the Witch and the Wardrobe",
                author: "C.S. Lewis",
                stock: 1
            }),
        ];

        await queryRunner.connection
            .getRepository(Book)
            .insert(books);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.connection
            .createQueryBuilder()
            .delete()
            .from(Book)
            .execute()
    }

}
