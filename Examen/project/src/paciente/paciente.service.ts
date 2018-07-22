import {Component} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, Like, Not, Repository} from "typeorm";
import {PacienteEntity} from "./paciente.entity";
import {UsuarioData} from "../usuario/usuario.data";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {PacienteData} from "./paciente.data";
import {MedicamentoEntity} from "../medicamentos/medicamento.entity";

@Component()

export class PacienteService {

    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>
    ){}
    pacientes: Paciente[] = [];

    //Metodo Crear pacientes
    crearPaciente(paciente: Paciente){

        const pac = new PacienteEntity();
        pac.nombres = paciente.nombres;
        pac.apellidos = paciente.apellidos;
        const fecha = new Date(paciente.fechaNacimiento);
        pac.fechaNacimiento = fecha;
        pac.hijos = paciente.hijos;
        pac.tieneSeguro = paciente.tieneSeguro;
        pac.usuarioFK = paciente.usuarioFKIdUsuario;
        pac.img_paciente = paciente.img_paciente;

        this.pacienteRepository.save(pac);
    }

    crearTodosPacientes(){

        for (var indice in PacienteData){
            const paciente = new PacienteEntity();

            paciente.nombres = PacienteData[indice].nombres;
            paciente.apellidos = PacienteData[indice].apellidos;
            paciente.fechaNacimiento = new Date(PacienteData[indice].fechaNacimiento);
            paciente.hijos = PacienteData[indice].hijos;
            paciente.tieneSeguro = PacienteData[indice].tieneSeguro;
            paciente.usuarioFK = parseInt(PacienteData[indice].usuarioFKIdUsuario);
            paciente.img_paciente = PacienteData[indice].img_paciente;

            this.pacienteRepository.save(paciente);
        }
    }

    //Metodo Listar Todos los paciente, menos los pacientes de un determinado usuario
    async listarPacienteOtrosUsuarios(id:number): Promise<PacienteEntity[]>{
        return (await this.pacienteRepository.find({
            where:{usuarioFK:Not(Equal(id))}
        }));
    }

    //Metodo Listar Todos los Id de los pacientes, menos los pacientes de un determinado usuario
    async listarIdsPacienteOtrosUsuarios(id:number): Promise<PacienteEntity[]>{
        return (await this.pacienteRepository.find({
            select:["id_paciente"],
            where:{usuarioFK:Equal(id)}
        }));
    }

    //Obtener un determinado paciente
    async obtenerPacientesPorId(idPac:number): Promise<PacienteEntity[]>{
        return (await this.pacienteRepository.find({
            id_paciente:Equal(idPac)}));
    }

    //obtener pacientes mediante el operador like y que no sean de un determinado usuario
    async buscarPacienteLike(name: string, id:number): Promise<PacienteEntity[]> {
        //console.log(await this.pacienteRepository.find({nombres:Like('%'+name+'%')}));
        return (await this.pacienteRepository.find({
            nombres:Like('%'+name+'%'), usuarioFK:Not(Equal(id))
        }));
    }

    //Metodo pacientes de un determinado usuario
    async obtenerPacientesPorUsuario(idUser:number): Promise<PacienteEntity[]>{
        return (await this.pacienteRepository.find({usuarioFK:Equal(idUser)}));
    }

    //Metodo Listar Todos los paciente
    async findAll(): Promise<PacienteEntity[]>{
        //console.log(await this.pacienteRepository.find());
        return (await this.pacienteRepository.find());
    }

}


export class Paciente {
    constructor(
        public nombres:string,
        public apellidos:string,
        public fechaNacimiento:string,
        public hijos:number,
        public tieneSeguro:boolean,
        public img_paciente:string,
        public usuarioFKIdUsuario:number,
    ){};
}