import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import BaseEntity from "../base.entity";
import { Exclude } from "class-transformer";
import { Book } from "./book";
import { User } from "./user";

@Entity('book_borrowers')
export class BookBorrower extends BaseEntity<BookBorrower> {
    @PrimaryColumn()
    id: string;

    @Exclude()
    @Column()
    borrower_id: string;
    
    @Exclude()
    @Column()
    book_id: string;

    @Column()
    status: string;

    @Column()
    borrowed_at: Date;

    @Column()
    returned_at: Date;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.books)
    @JoinColumn({ name: 'borrower_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Book, (book) => book.borrowers)
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
    book: Book;

}
