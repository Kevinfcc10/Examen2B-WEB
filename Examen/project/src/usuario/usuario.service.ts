import {Component, Req, Res} from "@nestjs/common";
import {InjectConnection, InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {Connection, EntityManager, Equal, getRepository, Like, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioData} from "./usuario.data";
import {Paciente} from "../paciente/paciente.service";

@Component()
export class UsuarioService {


    constructor(

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>

    ) {}

    async findAll(): Promise<UsuarioEntity[]> {
        //console.log(await this.usuarioRepository.find());
        return (await this.usuarioRepository.find());
    }


    crearUsuario(usuario: Usuario){
        const user = new UsuarioEntity();
        user.nombre_usuario = usuario.nombre;
        user.password_usuario = usuario.password;
        //this.connection.manager.save(user);
        this.usuarioRepository.save(user);
    }

    crearTodosUsuarios(){

        for (var indice in UsuarioData){
            const user = new UsuarioEntity();
            //console.log(usuario+"  "+UsuarioData[usuario].nombre_usuario+"  "+UsuarioData[usuario].password_usuario);
            user.nombre_usuario = UsuarioData[indice].nombre_usuario;
            user.password_usuario = UsuarioData[indice].password_usuario;
            this.usuarioRepository.save(user);
            //console.log(user.nombre_usuario + '  ' + user.password_usuario);
            //this.connection.manager.save(user);

        }
    }

    async buscarUsuarioNombre(name: string, pass:string): Promise<UsuarioEntity[]> {
        console.log(await this.usuarioRepository.find({nombre_usuario:Equal(name), password_usuario:Equal(pass)}));
        return (await this.usuarioRepository.find({nombre_usuario:Equal(name), password_usuario:Equal(pass)}));
    }

    async buscarUsuarioLike(name: string): Promise<UsuarioEntity[]> {
        console.log(await this.usuarioRepository.find({nombre_usuario:Like('%'+name+'%')}));
        return (await this.usuarioRepository.find({nombre_usuario:Like('%'+name+'%')}));
    }

}

export class Usuario {

    constructor(
        public nombre:string,
        public password:string,
    ){};

}