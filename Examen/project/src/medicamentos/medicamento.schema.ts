import * as Joi from 'joi';
export const MEDICAMENTO_SCHEMA = Joi
    .object()
    .keys({
        gramosAIngerir:Joi.number().precision(2).required(),
        nombre: Joi.string().regex(/^[a-zA-Z.,' ' ]{4,30}$/).required(),
        composicion:Joi.string().regex(/^[a-zA-Z0-9 ]{4,30}$/).required(),
        usadoPara:Joi.string().regex(/^[a-zA-Z,.' ' ]{4,50}$/).required(),
        fechaCaducidad:Joi.date().required(),
        numeroPastillas:Joi.number().integer().required(),
        pacienteIdIdPaciente:Joi.number().integer().required(),
    });