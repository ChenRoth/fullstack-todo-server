import Joi from '@hapi/joi';

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})