import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class PacientePipe implements PipeTransform{
    constructor (private readonly _schema){
    }

    transform(jsonValidarPaciente: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarPaciente, this._schema);
        if(error){
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Paciente no valido',
                },
                10
            )
        }else{
            return jsonValidarPaciente;
        }

    }
}