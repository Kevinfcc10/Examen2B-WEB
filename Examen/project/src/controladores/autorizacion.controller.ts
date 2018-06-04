import {Body, Controller, Get, Headers, HttpStatus, Post, Req, Res} from "@nestjs/common";

@Controller('Autorizacion')
export class AutorizacionController {

    @Post('iniciarSesion')
    iniciarSesion(@Body() bodyParams, @Res () response, @Req () request, @Headers() headers){

        //var user = 'adrianeguez';
        let usuario = bodyParams.usuario;
        let password = bodyParams.password;

        console.log(usuario);
        console.log(password);

        if(usuario && password){
            if(usuario==='adrianeguez' && password==='12345678910'){

                const parametros = {
                     nombreCookie: 'token',
                     valorCookie: usuario.toString(),
                };
                response.cookie(parametros.nombreCookie,parametros.valorCookie);
                console.log(headers);
                //return response.send({mensaje:'ok'});
                return response.send({mensaje:'ok',  cookie: headers.cookie});
            }
            else {
                if(usuario!=='adrianeguez'){
                    response.send({mensaje:'usuario incorrecto'});
                }
                if(password!=='12345678910'){
                    response.send({mensaje:'password incorrecto'});
                }
            }
        }
        else {
            response.send({mensaje:'No hay ningun parametros'});
        }

    }

    @Post('cerrarSesion')
    cerrarSesion(@Req() request, @Res() response, @Headers() headers){
        console.log(headers);
        const parametros = {
            nombreCookie: 'token',
            valorCookie: undefined,
        };


        //response.clearCookie('token');
        //console.log(parametros.valorCookie)
        response.cookie(parametros.nombreCookie,parametros.valorCookie);
        return response.send({mensaje: 'Usted salio del sistema', cookie: headers.cookie});
        //return response.send({mensaje: 'Usted salio del sistema'});
    }


}