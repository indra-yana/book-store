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

export const validateBorrowSchema = Joi.object({
	borrower_id: idSchema,
	book_id: idSchema,
	returned_at: Joi.string().required()
});

export const validateReturnedSchema = Joi.object({
	borrower_id: idSchema,
	book_id: idSchema,
});
