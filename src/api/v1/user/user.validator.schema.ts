import {
	nameSchema,
	usernameSchema,
	passwordSchema,
	passwordConfirmationSchema,
	emailSchema,
	idSchema,
} from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const createUserSchema = Joi.object({
	name: nameSchema,
	username: usernameSchema,
	password: passwordSchema,
	password_confirmation: passwordConfirmationSchema,
	email: emailSchema,
}).unknown();

export const updateUserSchema = Joi.object({
	id: Joi.string().required(),
	name: nameSchema,
	username: usernameSchema,
	email: emailSchema,
}).unknown();

export const validateIdSchema = Joi.object({
	id: idSchema,
});

export const addUserRoleSchema = Joi.object({
	user_id: idSchema,
	role_id: idSchema,
});