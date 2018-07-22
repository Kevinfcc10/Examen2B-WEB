import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import * as Joi from 'joi';
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
@Injectable()
export class TransferenciaPipe implements PipeTransform{
    constructor (private readonly _schema){
    }

    transform(jsonValidarTransferencia: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarTransferencia, this._schema);
        if(error){
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Transferencia no valido',
                },
                10
            )
        }else{
            return jsonValidarTransferencia;
        }

    }
}