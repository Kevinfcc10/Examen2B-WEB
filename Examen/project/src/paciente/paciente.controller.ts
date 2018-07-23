import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {PacienteService,Paciente} from "./paciente.service";
import {PacientePipe} from "../pipes/paciente.pipe";
import {PACIENTE_SCHEMA} from "./paciente.schema";


@Controller('Paciente')
export  class PacienteController {

    constructor(private  pacienteService: PacienteService){

    }

    //registarr un paciente en la base de datos - Body params
    @Post('registrar') //uso pipe
    crearPaciente(@Body(new PacientePipe(PACIENTE_SCHEMA)) bodyParams, @Res () response) {
            const paciente1 = new Paciente(
                bodyParams.nombres,
                bodyParams.apellidos,
                bodyParams.fechaNacimiento,
                bodyParams.hijos,
                bodyParams.tieneSeguro,
                bodyParams.usuarioFKIdUsuario,
                bodyParams.img,
            );
            this.pacienteService.crearPaciente(paciente1);

            return response.send('Paciente Registrado');
    }

    //registrar pacientes quemados en la base de datos
    @Get('crearPacientes')
    registrarAllPacientes(@Res () response, @Req () request){
        this.pacienteService.crearTodosPacientes()
        return response.status(202).send('Pacientes Creados');
    }

    //listar todos los pacientes que no pertenecen a un determinado usuario
    @Get('listarPacientes/:id')
    listarPacientesOtrosUsuarios(@Res () response, @Req () request, @Param() params){
        var promise = Promise.resolve(this.pacienteService.listarPacienteOtrosUsuarios(params.id));
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun paciente',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }

    //Filtrar pacientes mediante el operador Like que no pertenecen a un determinado usuario
    @Get('filtrarPacientes/:name&:id')
    mostrarPacienteLike(@Res () response, @Req () request, @Param() params){

        var promise = this.pacienteService.buscarPacienteLike(params.name, params.id);
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

    //obtener un determinado paciente en base a su id
    @Get('obtenerPaciente/:id')
    mostrarPaciente(@Res () response, @Req () request, @Param() params){

        var promise = this.pacienteService.obtenerPacientesPorId(params.id);
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


    //obtener los pacientes de un determinado usuario
    @Get('obtenerPacientePorUsuario/:id')
    mostrarPacientePorUsuario(@Res () response, @Req () request, @Param() params){

        var promise = this.pacienteService.obtenerPacientesPorUsuario(params.id);
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


    //listar todos los pacientes de la base de datos
    @Get('listarPacientes')
    listarTodosLosPaciente(@Res () response, @Req () request){
        var promise = Promise.resolve(this.pacienteService.findAll());
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun paciente',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }

    //obtener paciente dado medicamento
    @Get('idMedicamento/:id')
    obtenerPacienteDadoMed(@Res () response, @Req () request, @Param() params){
        var promise = Promise.resolve(this.pacienteService.obtenerPacientesPorMed(params.id));
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun paciente',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }
}

