const Joi = require('joi');

const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly:false});

const userSchema = Joi.object({
    firstName: 
    Joi.string()
    .min(2).max(20).
    pattern(/^[^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/)
    .required().messages({
        'any.required': 'First name required',
        'string.empty': 'First name required',
        'string.max': 'First name have max of {#limit} characters',
        'string.min': 'First name have min of {#limit} characters',
        'string.pattern.base': 'Invalid name type',
    }),

    lastName:
    Joi.string()
    .min(2).max(20).
    pattern(/^[^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{2,}$/)
    .required().messages({
        'any.required': 'Last name required',
        'string.empty': 'Last name required',
        'string.max': 'Last name have max of {#limit} characters',
        'string.min': 'Last name have min of {#limit} characters',
        'string.pattern.base': 'Invalid name type',
    }),

    email:
    Joi.string()
    .email()
    .lowercase()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required().messages({
        'any.required': 'Email required',
        'string.empty': 'Email required',
        'string.email': 'Please enter a valid email',
        'string.pattern.base': 'Invalid email',
    }),

    contactNum:
    Joi.string()
    .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    .messages({
        "string.pattern.base" : "Invalid contact number"
    })
    .required(),

    status: 
    Joi.boolean().default(false),

    password: 
    Joi.string()
    .messages({
        'string.empty':'Please enter your password'
    })
})

// module.exports = validator(userSchema);
exports.validateUser = validator(userSchema);