import {Component} from "@nestjs/common";

@Component()

export class PacienteService {

    //Metodo Crear paciente
    pacientes: Paciente[] = [];
    crearPaciente(paciente: Paciente): Paciente[]{
        this.pacientes.push(paciente);
        return this.pacientes;
    }

    //Metodo Listar Todos los paciente
    listarPaciente(){
        return this.pacientes;
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
    ){};

}