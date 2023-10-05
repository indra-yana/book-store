import { idSchema } from 'src/core/common/validator/shared.validator.schema';
import { Joi } from 'src/core/common/validator/validator.service';

export const createBookSchema = Joi.object({
	code: Joi.string().required(),
	title: Joi.string().required(),
	author: Joi.string().required(),
	stock: Joi.number().required(),
}).unknown();

export const updateBookSchema = Joi.object({
	id: Joi.string().required(),
	code: Joi.string().required(),
	title: Joi.string().required(),
	author: Joi.string().required(),
	stock: Joi.number().required(),
}).unknown();

export const validateIdSchema = Joi.object({
	id: idSchema,
});
