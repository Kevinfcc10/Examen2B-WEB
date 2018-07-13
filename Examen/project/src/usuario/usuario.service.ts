import {Component, Req, Res} from "@nestjs/common";
import {InjectConnection, InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {Connection, EntityManager, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Component()
export class UsuarioService {


    constructor(
        @InjectConnection()
        private readonly connection:Connection,

        @InjectEntityManager()
        private readonly entityManager: EntityManager,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async findAll(): Promise<UsuarioEntity[]> {
        return (await this.usuarioRepository.find());
    }


    crearUsuario(){
        console.log('ENTROOOOOOOOOOOOOOOOOOOOOOOOO');
        const user = new UsuarioEntity();
        user.nombre_usuario = 'Kevin1';
        user.password_usuario = 'hola1';
        this.connection.manager.save(user);
    }
}