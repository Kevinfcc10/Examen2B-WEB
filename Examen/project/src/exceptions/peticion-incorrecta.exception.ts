import {HttpException, HttpStatus} from "@nestjs/common";

export class PeticionIncorrectaException extends HttpException{
    constructor(private readonly _mensaje,
                private readonly _nivelError){
        super(
                    {mensaje: 'Peticion incorrecta',
                        statusCode: HttpStatus.BAD_REQUEST,
                        nivelError: _nivelError,
                        detalle: _mensaje},
        HttpStatus.BAD_REQUEST);
    }
}