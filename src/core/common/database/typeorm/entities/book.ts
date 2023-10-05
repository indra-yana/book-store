import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer";
import BaseEntity from "../base.entity";
import { User } from "./user";
import { BookBorrower } from "./book-borrower";

@Entity('books')
export class Book extends BaseEntity<Book> {
    @PrimaryColumn()
	id: string;

	@Column({ unique: true })
	code: string;
	
    @Column()
	title: string;
	
    @Column()
	author: string;
	
    @Column()
	stock: number;
	
    @Column()
	borrowed: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

    @Exclude()
	@DeleteDateColumn()
	deleted_at: Date;

	@OneToMany(() => BookBorrower, bookBorrower => bookBorrower.book)
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
	borrowers: BookBorrower[];

}
