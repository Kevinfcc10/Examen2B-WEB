import {Body, Controller, Get, HttpStatus, Param, Post, Req, Res} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {UsuarioPipe} from "../pipes/usuario.pipe";
import {USUARIO_SCHEMA} from "./usuario.schema";

@Controller('Usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){

    }

    //Metodo para obtener todos los usuarios a excepcion del usuario logeado /***********Consumiendo***********/
    @Get('listarUsuarios/:id')
    listarUsuarios(@Res () response, @Req () request, @Param() params){
        var promise = Promise.resolve(this.usuarioService.findAll(params.id));
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

    //Metodo para crear todos los usuarios quemados en la app /***********Consumiendo***********/
    @Get('crearUsuarios')
    registrarAllUser(@Res () response, @Req () request){
        this.usuarioService.crearTodosUsuarios();
        return response.status(202).send('Usuarios Creados');
    }

    //Metodo para registrar un usuario en la app /***********Consumiendo***********/
    @Post('registrarUsuarios')
    registrarUsuario(@Body(new UsuarioPipe(USUARIO_SCHEMA)) bodyParams, @Res () response){
        const usuario = new Usuario(
            bodyParams.nombre_usuario,
            bodyParams.password_usuario,
            bodyParams.img_usuario,
        );
        this.usuarioService.crearUsuario(usuario);
        return response.send('Usuario Registrado');
    }

    //metodo para filtrar los usuarios mediante el operador like que no son el usuario logeado
    ///***********Consumiendo***********/
    @Get('filtrarUsuarios/:name&:id')
    filtrarUsuariosLike(@Res () response, @Req () request, @Param() params){

        var promise = this.usuarioService.buscarUsuarioLike(params.name,params.id);
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

    //Obtener los datos de un determinado usuario mediante su id         /***********Consumiendo***********/
    @Get('obtenerUsuario/:id')
    obtenerUsuarioId(@Res () response, @Req () request, @Param() params){

        var promise = this.usuarioService.buscarUsuarioId(params.id);
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

    //Metodo para obtener los datos de un usuario logueado /***********Consumiendo***********/
    @Get('loginUsuario/:name&:pass')
    loginUsuario(@Res () response, @Req () request, @Param() params){

        var promise = this.usuarioService.loginUsuario(params.name, params.pass);
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

    //obtener el usuario al que pertenece un determinado paciente. /***********Consumiendo***********/
    @Get('usuario/:id')
    obtenerUsuarioDadoPaciente(@Res () response, @Req () request, @Param() params){

        var promise = this.usuarioService.encontrarUsuarioDadoPaciente(params.id);
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

    //obtener un usuario dado el medicamento
    @Get('usuarioMed/:id')
    obtenerUsuarioMed(@Res () response, @Req () request, @Param() params){
        var promise = this.usuarioService.obtenerUsuarioDadoMedicamento(params.id);
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