import {Body, Controller, Get, HttpStatus, Param, Post, Req, Res} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {PacientePipe} from "../pipes/paciente.pipe";
import {PACIENTE_SCHEMA} from "../paciente/paciente.schema";
import {UsuarioPipe} from "../pipes/usuario.pipe";
import {USUARIO_SCHEMA} from "./usuario.schema";
import {Paciente} from "../paciente/paciente.service";

@Controller('Usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){

    }

    @Get('mostrarUsuarios')
    listarUsuarios(@Res () response, @Req () request){
        var promise = Promise.resolve(this.usuarioService.findAll());
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun usuario',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    @Get('crearUsuarios')
    registrarAllUser(@Res () response, @Req () request){
        this.usuarioService.crearTodosUsuarios();
        return response.status(202).send('Usuarios Creados');
    }

    @Post('registrar')
    registrarUsuario(@Body(new UsuarioPipe(USUARIO_SCHEMA)) bodyParams, @Res () response){
        const usuario = new Usuario(
            bodyParams.nombre_usuario,
            bodyParams.password_usuario
        );
        this.usuarioService.crearUsuario(usuario);
        return response.send('Usuario Registrado');
    }

    @Get('/:name&:pass')
    mostrarUsuario(@Res () response, @Req () request, @Param() params){

        var promise = this.usuarioService.buscarUsuarioNombre(params.name, params.pass);
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

    @Get('/:name')
    mostrarUsuarioLike(@Res () response, @Req () request, @Param() params){

        var promise = this.usuarioService.buscarUsuarioLike(params.name);
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
}