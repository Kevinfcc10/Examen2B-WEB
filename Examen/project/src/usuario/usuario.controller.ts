import {Controller, Get, Req, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('Usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){

    }

    @Get('allUsers')
    listarUsuarios(@Res () response, @Req () request){
        return response.status(202).send(' '+this.usuarioService.findAll());
    }

    @Get('registro')
    registrarUsuario(){
        this.usuarioService.crearUsuario();
    }
}