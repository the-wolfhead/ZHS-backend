const Joi = require 'joi';

export const transferSchema = Joi.object({
  receiverId: Joi.string().required(),
  amount: Joi.number().positive().required(),
});
