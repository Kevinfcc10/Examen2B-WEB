import {Body, Controller, Get, HttpStatus, Param, Post, Req, Res} from "@nestjs/common";
import {Transferencia, TransferenciaService} from "./transferencia.service";
import {TransferenciaPipe} from "../pipes/transferencia.pipe";
import {TRANSFERENCIA_SCHEMA} from "./transferencia.schema";
import {USUARIO_SCHEMA} from "../usuario/usuario.schema";
import {UsuarioPipe} from "../pipes/usuario.pipe";

@Controller('Transferencia')
export class TransferenciaController {

    constructor(
        private transferenciaService: TransferenciaService
    ){}

    //Metodo para registrar una peticion /***********Consumiendo***********/
    @Post('registrarTransferencia')
    registrarTransferencia(@Res() response, @Body(new TransferenciaPipe(TRANSFERENCIA_SCHEMA)) bodyParams){
        const transfer = new Transferencia(
            bodyParams.idUsuarioRealiza,
            bodyParams.idUsuarioEspera,
            bodyParams.idMedicamento1,
            bodyParams.idMedicamento2,
            bodyParams.estadoPeticion,
            bodyParams.idPaciente1,
            bodyParams.idPaciente2,
        );

        this.transferenciaService.registrarPeticionTransferencia(transfer);
        return response.send('Peticion Registrado');
    }

    //Metodo para registrar una peticion con params params en la url  /***********Consumiendo***********/
    @Post('registrar/')
    registrar(@Body(new TransferenciaPipe(TRANSFERENCIA_SCHEMA)) bodyParams, @Res () response){
        const transfer = new Transferencia(
            bodyParams.idUsuarioRealiza,
            bodyParams.idUsuarioEspera,
            bodyParams.idMedicamento1,
            bodyParams.idMedicamento2,
            bodyParams.idPaciente1,
            bodyParams.idPaciente2,
            bodyParams.estadoPeticion,
        );
        this.transferenciaService.registrarPeticionTransferencia(transfer);
        return response.send('Peticion de transferencia Registrada');
    }

    //metodo apra actualizar el estado de una peticion Aceptado o Rechazado

    @Post('updateEstado')
    updateEstado(@Body() bodyParams, @Res () response){
        this.transferenciaService.updateEstado(bodyParams.idTrans,bodyParams.estadoPet);

        return response.send('Peticion de Actualizacion de transferencia Registrada');
    }


    //metodo para encontrar todas las transferencias en espera del usuario logueado  /***********Consumiendo***********/
    @Get('transferenciaEspera/:idUser')
    ObtenerTransferenciasEnEspera(@Res() response, @Req() request, @Param() params){
        var promise = this.transferenciaService.findAllEspera(params.idUser);

        promise.then(function (valor) {
            if(valor.length === 0){
                return response.send({
                    mensaje:'No se encontro ninguna transferencia',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(valor);
            }
        })

    }

    //metodo para encontrar todas las transferencias por confirmar del usuario logueado /***********Consumiendo***********/
    @Get('transferenciasPorConfirmar/:idUser')
    ObtenerTransferenciasPorConfirmar(@Res() response, @Req() request, @Param() params){
        var promise = this.transferenciaService.findAllTransfer(params.idUser);

        promise.then(function (valor) {
            if(valor.length === 0){
                return response.send({
                    mensaje:'No se encontro ninguna transferencia',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(valor);
            }
        })

    }

}