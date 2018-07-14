import * as Joi from 'joi';
export const PACIENTE_SCHEMA = Joi
    .object()
    .keys({
        nombres:Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        apellidos: Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        fechaNacimiento:Joi.date().required(),
        hijos:Joi.number().integer().min(0).max(8).required(),
        tieneSeguro:Joi.boolean().required(),
        usuarioFKIdUsuario: Joi.number().integer().required(),
    });
