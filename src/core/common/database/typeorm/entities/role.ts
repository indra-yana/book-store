import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user';
import BaseEntity from '../base.entity';

@Entity('roles')
export class Role extends BaseEntity<Role> {

	@PrimaryColumn()
	id: string;

	@Column({ unique: true })
	name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Exclude()
	@DeleteDateColumn()
	deleted_at: Date;

	@ManyToMany(() => User)
	@JoinTable({
		name: 'user_roles',
		inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id'
		},
		joinColumn: {
			name: 'role_id',
			referencedColumnName: 'id'
		}
	})
	users: User[];
}
