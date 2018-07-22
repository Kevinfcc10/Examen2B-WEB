import {Component, Req, Res} from "@nestjs/common";
import {InjectConnection, InjectEntityManager, InjectRepository} from "@nestjs/typeorm";
import {Connection, EntityManager, Equal, getRepository, Like, Not, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioData} from "./usuario.data";
import {MedicamentoEntity} from "../medicamentos/medicamento.entity";

@Component()
export class UsuarioService {


    constructor(

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>

    ) {}

    async findAll(id: number): Promise<UsuarioEntity[]> {
        return (await this.usuarioRepository.find({
            select:["nombre_usuario","id_usuario","img_usuario"],
            where:{id_usuario:Not(Equal(id))}}));
    }


    crearUsuario(usuario: Usuario){
        const user = new UsuarioEntity();
        user.nombre_usuario = usuario.nombre;
        user.password_usuario = usuario.password;
        user.img_usuario = usuario.img;
        //this.connection.manager.save(user);
        this.usuarioRepository.save(user);
    }

    crearTodosUsuarios(){

        for (var indice in UsuarioData){
            const user = new UsuarioEntity();
            user.nombre_usuario = UsuarioData[indice].nombre_usuario;
            user.password_usuario = UsuarioData[indice].password_usuario;
            user.img_usuario = UsuarioData[indice].img_usuario;
            this.usuarioRepository.save(user);
            //console.log(user.nombre_usuario + '  ' + user.password_usuario);
            //this.connection.manager.save(user);
        }
    }

    async buscarUsuarioLike(name: string, id: number): Promise<UsuarioEntity[]> {
        //console.log(await  this.usuarioRepository.find({select:["nombre_usuario","id_usuario","img_usuario"], where:{nombre_usuario:Like('%'+name+'%'), id_usuario:Not(Equal(id))}}));
        return (await  this.usuarioRepository.find({
            select:["nombre_usuario","id_usuario","img_usuario"],
            where:{nombre_usuario:Like('%'+name+'%'), id_usuario:Not(Equal(id))}
        }));
    }

    async buscarUsuarioId(id: number): Promise<UsuarioEntity[]> {
        //console.log(await this.usuarioRepository.find({id_usuario:Equal(id)}));
        return (await this.usuarioRepository.find({
            select:["nombre_usuario","id_usuario","img_usuario"],
            where:{id_usuario:Equal(id)}
        }));
    }

    async loginUsuario(name: string, pass:string): Promise<UsuarioEntity[]> {
        return (await this.usuarioRepository.find({
            select:["nombre_usuario","id_usuario","img_usuario"],
            where: {nombre_usuario:Equal(name), password_usuario:Equal(pass)}
        }));
    }


    //Metodo para obtener el usuario dado el id de un paciente
    async encontrarUsuarioDadoPaciente(idPac:number): Promise<UsuarioEntity[]>{
        const joinUsuarioPaciente = await this.usuarioRepository.createQueryBuilder("usuario")
            .select(["usuario.id_usuario","usuario.nombre_usuario","usuario.img_usuario"])
            .innerJoin("usuario.pacienteId","pac")//representa a la entidad paciente
            .innerJoin("pac.usuarioFK","user")//representa a la entidad usuario
            .where("pac.id_paciente = :id")
            .setParameter("id",idPac)
            .getMany()
        return (joinUsuarioPaciente);
    }


    //Metodo obtener el usuario dado un medicamento
    async  obtenerUsuarioDadoMedicamento(idMed:number): Promise<UsuarioEntity[]>{
        const joinExample = await this.usuarioRepository.createQueryBuilder("usuario")
            .select(["usuario.id_usuario","usuario.nombre_usuario","usuario.img_usuario"])
            .innerJoin("usuario.pacienteId", "pac") //representa a la entidad paciente
            .innerJoin("pac.medicamentoId", "med") //representa a la entidad usuario
            .where( "med.id_medicamento = :id")
            .setParameter("id", idMed)
            .getMany();

        console.log(joinExample)
        return (joinExample);
    }

}

export class Usuario {
    constructor(
        public nombre:string,
        public password:string,
        public img:string
    ){};
}