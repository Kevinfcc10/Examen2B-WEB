import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";
import * as Joi from 'joi';
@Injectable()
export class MedicamentoPipe implements PipeTransform{
    constructor (private readonly _schema){
    }
    transform(jsonValidarMedicamento: any, metadata: ArgumentMetadata){
        const  {error}= Joi.validate(jsonValidarMedicamento, this._schema)
        if(error){
            //botar un error
            throw  new PeticionIncorrectaException(
                {
                    erorr: error,
                    mensaje: 'Json de Medicamento no valido',
                },
                10
            )
        } else{
            return jsonValidarMedicamento;
        }
    }
}