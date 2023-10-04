import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import BaseEntity from '../base.entity';
import { Role } from './role';
import { Exclude, Transform } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity<User>  {

	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	username: string;

	@Exclude()
	@Column({ select: false })
	password: string;

	@Column({ unique: true })
	email: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn({ select: false })
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

}
