import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer";
import BaseEntity from "../base.entity";

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
}
