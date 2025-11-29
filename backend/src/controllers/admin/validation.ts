import Joi from "joi";

export const newVacationValidator = Joi.object({
    destination: Joi.string().min(10).max(40).uppercase().required(),
    description: Joi.string().min(20).required(),
    price: Joi.number().min(0).max(10000).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
})

export const newVacationImageValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpeg', 'image/png')
    }).unknown(true).optional()
})


export const updateVacationValidator = Joi.object({
    destination: Joi.string().min(10).max(40).uppercase().optional(),
    description: Joi.string().min(20).optional(),
    price: Joi.number().min(0).max(10000).optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    image: Joi.string().optional()
});


export const getVacationValidator = Joi.object({
    vacationId: Joi.string().uuid()
})