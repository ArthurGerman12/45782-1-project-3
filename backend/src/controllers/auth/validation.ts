import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})

export const signupValidator = loginValidator.keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required()
})