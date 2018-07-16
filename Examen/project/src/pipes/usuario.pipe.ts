import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class UsuarioPipe implements PipeTransform{
    constructor (private readonly _schema){
    }

    transform(jsonValidarUsuario: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarUsuario, this._schema);
        if(error){
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Usuario no valido',
                },
                10
            )
        }else{
            return jsonValidarUsuario;
        }

    }
}