import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {PacienteService,Paciente} from "./paciente.service";
import {PacientePipe} from "../pipes/paciente.pipe";
import {PACIENTE_SCHEMA} from "./paciente.schema";


@Controller('Paciente')
export  class PacienteController {

    constructor(private  pacienteService: PacienteService){

    }
    //Body params
    @Post('registrar') //uso pipe
    crearPaciente(@Body(new PacientePipe(PACIENTE_SCHEMA)) bodyParams, @Res () response) {
            const paciente1 = new Paciente(
                bodyParams.nombres,
                bodyParams.apellidos,
                bodyParams.fechaNacimiento,
                bodyParams.hijos,
                bodyParams.tieneSeguro,
                bodyParams.usuarioFKIdUsuario,
            );
            this.pacienteService.crearPaciente(paciente1);

            return response.send('Paciente Registrado');
    }

    @Get('crearPacientes')
    registrarAllPacientes(@Res () response, @Req () request){
        this.pacienteService.crearTodosPacientes()
        return response.status(202).send('Pacientes Creados');
    }

    @Get('mostrarPacientes')
    listarTodosLosPaciente(@Res () response, @Req () request){
        var promise = Promise.resolve(this.pacienteService.listarPaciente());
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
    @Get('/:name')
    mostrarPacienteLike(@Res () response, @Req () request, @Param() params){

        var promise = this.pacienteService.buscarPacienteLike(params.name);
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
















    @Get('/:id')
    mostrarPaciente(@Res () response, @Req () request, @Param() params){

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



    /*
    @Put('/:id') //Uso pipe
    modificarPaciente(@Res () response, @Req () request, @Param() params, @Body(new PacientePipe(PACIENTE_SCHEMA)) body){
        let arregloPaciente = this.pacienteService.obtenerUno(params.id);
        if(arregloPaciente) {
            return response.send(
                this.pacienteService.editarUno(
                    params.id,
                    body.nombres,
                    body.apellidos,
                    body.fechaNacimiento,
                    body.hijos,
                    body.tieneSeguro
                ));
        } else{
            return response.send({
                mensaje:'Paciente no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + ' Not found',
                url:request.path,
               //headers: request.headers,
            });
        }
    }
    */
}

