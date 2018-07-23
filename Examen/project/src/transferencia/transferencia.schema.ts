import * as Joi from 'joi';
export const TRANSFERENCIA_SCHEMA = Joi
    .object()
    .keys({
        idUsuarioRealiza:Joi.number().integer().required(),
        idUsuarioEspera:Joi.number().integer().required(),
        idMedicamento1:Joi.number().integer().required(),
        idMedicamento2:Joi.number().integer().required(),
        idPaciente1:Joi.number().integer().required(),
        idPaciente2:Joi.number().integer().required(),
        estadoPeticion: Joi.string().regex(/^[a-z]{4,30}$/).required(),
    })