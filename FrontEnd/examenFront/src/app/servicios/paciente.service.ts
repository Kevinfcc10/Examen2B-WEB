import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PacieneInterface} from "../interfaces/paciene.interface";

@Injectable()
export class PacienteService{

  public static  pacienteSelect1 : number =0;
  public static  pacienteSelect2 : number =0;

  constructor(private consulta: HttpClient) {
  }

  //listar todos los pacientes que no pertenecen a un determinado usuario
  obtenerAllPaciente(idUser:number){
    return this.consulta.get('http://localhost:1337/Paciente/listarPacientes/'+idUser);
  }

  //Filtrar pacientes mediante el operador Like que no pertenecen a un determinado usuario
  obtenerPacientebusqueda(busqueda:string,idUser:number){
    return this.consulta.get('http://localhost:1337/Paciente/filtrarPacientes/'+busqueda+'&'+idUser);
  }

  //obtener un determinado paciente en base a su id
  obtenerPacienteid(idPac:number){
    return this.consulta.get('http://localhost:1337/Paciente/obtenerPaciente/'+idPac);
  }

  //obtener pacientes por un determinado usuario
  obtenerPacientesPorUsuario(idUser:number){
    return this.consulta.get('http://localhost:1337/Paciente/obtenerPacientePorUsuario/'+idUser)
  }

  //obtenerpaciente por el id del medicamento
  obtenerPaciente(idMed:number){
    return this.consulta.get('http://localhost:1337/Paciente/idMedicamento/'+idMed)
  }

}
