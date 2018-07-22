import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Medicamento, MedicamentoService} from "./medicamento.service";
import {MedicamentoPipe} from "../pipes/medicamento.pipe";
import {MEDICAMENTO_SCHEMA} from "./medicamento.schema";

@Controller('Medicamento')
export class MedicamentoController {

    constructor(private  medicamentoService: MedicamentoService){

    }

    //Body params - registrar un medicamento en la app
    @Post('registrarMedicamentos')
    crearMedicamento(@Body(new MedicamentoPipe(MEDICAMENTO_SCHEMA)) bodyParams, @Res () response){
        const medicamento1 = new  Medicamento(
            bodyParams.gramosAIngerir,
            bodyParams.nombre,
            bodyParams.composicion,
            bodyParams.usadoPara,
            bodyParams.fechaCaducidad,
            bodyParams.numeroPastillas,
            bodyParams.pacienteIdIdPaciente,
            bodyParams.img_med,
        );

        this.medicamentoService.crearMedicamento(medicamento1);
        return response.send('Medicamento Registrado');

    }

    //registrar los medicamento quemados en la app
    @Get('crearMedicamentos')
    registrarAllMedicamentos(@Res () response, @Req () request){
        this.medicamentoService.crearTodosMedicamentos()
        return response.status(202).send('Medicamentos Creados');
    }

    //listar todos los medicamentos que no pertenecen a los pacientes de un determinado usuario
    @Get('mostrarMedicamentos/:idUser')
    listarTodosLosMedicamentos(@Res () response, @Req () request, @Param() params){
        var promise = Promise.resolve(this.medicamentoService.listarMedicamentoPacienteUsuario(params.idUser))

        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun medicamento',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda con el operador Like de el o los medicamentos que no pertenecen a los pacientes de un determinado usuario
    @Get('busquedaMedicamentos/:name&:id')
    mostrarMedLike(@Res () response, @Req () request, @Param() params){

        var promise = this.medicamentoService.busquedaLike(params.name,params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el usuario',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda de el/los medicamentos de un determinado paciente
    @Get('listarMedicamentos/paciente/:id')
    mostrarMedicamentoPaciente(@Res () response, @Req () request, @Param() params){
        var promise = this.medicamentoService.buscarMedPac(params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el medicamento',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda de el/los medicamentos del usuario logeado
    @Get('listarMedicamentos/usuario/:id')
    mostrarMedicamentoUsuario(@Res () response, @Req () request, @Param() params){
        var promise = this.medicamentoService.listarMedicamentoUsuario(params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el medicamento',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda de un determinado medicamento.
    @Get('medicamento/:id')
    obtenerMedicamentoId(@Res () response, @Req () request, @Param() params){
        var promise = this.medicamentoService.obtenerUno(params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el medicamento',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

}