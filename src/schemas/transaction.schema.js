import Joi from "joi";

export const transactionSchema = Joi.object({
    description: Joi.string().required(),
    type: Joi.string().valid('entrada', 'saida').required(),
    value: Joi.number().required()
})