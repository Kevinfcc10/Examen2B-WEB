import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Medicamento, MedicamentoService} from "./medicamento.service";
import {MedicamentoPipe} from "../pipes/medicamento.pipe";
import {MEDICAMENTO_SCHEMA} from "./medicamento.schema";

@Controller('Medicamento')
export class MedicamentoController {

    constructor(private  medicamentoService: MedicamentoService){

    }

    //Body params
    @Post('crear')
    crearMedicamento(@Body(new MedicamentoPipe(MEDICAMENTO_SCHEMA)) bodyParams){
        const medicamento1 = new  Medicamento(
            bodyParams.gramosAIngerir,
            bodyParams.nombre,
            bodyParams.composicion,
            bodyParams.usadoPara,
            bodyParams.fechaCaducidad,
            bodyParams.numeroPastillas,
            bodyParams.pacienteId,
        );

        return this.medicamentoService.crearMedicamento(medicamento1);

    }

    @Get('listar')
    listarTodosLosMedicamentos(@Res () response, @Req () request){
        var arregloMedicamentos = this.medicamentoService.listarMedicamento();
        if(Object.keys(arregloMedicamentos).length === 0){
            return response.send({
                mensaje:'No existe ningun medicamento',
                estado: HttpStatus.NOT_FOUND + ' Not found',
            });
        } else{
            return response.status(202).send(arregloMedicamentos);
        }
        //return response.status(202).send(this.medicamentoService.listarMedicamento());
    }

    @Get('/:id')
    mostrarUnMedicamento(@Res () response, @Req () request, @Param() params){
        let arregloMedicamento = this.medicamentoService.obtenerUno(params.id);
        if(arregloMedicamento){
            return response.send(arregloMedicamento);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Medicamento no encontrado',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                URL:request.originalUrl,
            });
        }
    }

    @Put('/:id')
    modificarMedicamento(@Res () response, @Req () request, @Param() params, @Body(new MedicamentoPipe(MEDICAMENTO_SCHEMA)) body){
        let arregloMedicamento = this.medicamentoService.obtenerUno(params.id);
        if(arregloMedicamento){
            return response.send(
                this.medicamentoService.editarUno(
                    params.id,
                    body.gramosAIngerir,
                    body.nombre,
                    body.composicion,
                    body.usadoPara,
                    body.fechaCaducidad,
                    body.numeroPastillas,
                    body.pacienteId,
                ));
        } else{
            return response.send({
                mensaje:'Medicamento no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
            });
        }
    }
}