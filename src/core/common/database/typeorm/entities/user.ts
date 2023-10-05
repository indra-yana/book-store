import { BookBorrower } from './book-borrower';
import { Entity, Column, PrimaryColumn, BeforeInsert, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, JoinTable, ManyToMany, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { Role } from './role';
import * as bcrypt from 'bcrypt';
import BaseEntity from '../base.entity';

@Entity('users')
export class User extends BaseEntity<User>  {

	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	username: string;

	@Exclude()
	@Column()
	password: string;

	@Column({ unique: true })
	email: string;

	@Column()
	penalty: boolean;

	@Column()
	penalty_until: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Exclude()
	@DeleteDateColumn()
	deleted_at: Date;

	@Column({ default: null })
	email_verified_at: Date;

	@BeforeInsert()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 10);
	}

	@Transform(({ value }) => value.map((role: Role) => role.name.toLowerCase().replace(/\s+/g, "_")))
	@ManyToMany(() => Role)
    @JoinTable({ 
		name: 'user_roles',
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'id'
		},
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		}
	})
	roles: Role[];

	@OneToMany(() => BookBorrower, bookBorrower => bookBorrower.borrower)
    @JoinColumn({ name: 'borrower_id', referencedColumnName: 'id' })
	books: BookBorrower[];

}
