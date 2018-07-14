import {Component} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
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

    //Metodo Listar Todos los paciente
    async listarPaciente(): Promise<PacienteEntity[]>{
        //console.log(await this.pacienteRepository.find());
        return (await this.pacienteRepository.find());
    }

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

            this.pacienteRepository.save(paciente);
        }
    }












    //Metodo obtener un paciente
    obtenerUno(pacienteID){

        console.log(this.pacientes[pacienteID]);
        return this.pacientes[pacienteID];
    }


    //Metodo editar un paciente
    editarUno(idPac, nombrePac, apellidoPac, fechaPac, hijosPac, tieneSeguroPac){
        let pacienteActualizado = this.obtenerUno(idPac);

        pacienteActualizado.nombres = nombrePac;
        pacienteActualizado.apellidos = apellidoPac;
        pacienteActualizado.fechaNacimiento = fechaPac;
        pacienteActualizado.hijos = hijosPac;
        pacienteActualizado.tieneSeguro = tieneSeguroPac;

        return pacienteActualizado;
    }
}


export class Paciente {
    constructor(
        public nombres:string,
        public apellidos:string,
        public fechaNacimiento:string,
        public hijos:number,
        public tieneSeguro:boolean,
        public usuarioFKIdUsuario:number,
    ){};
}