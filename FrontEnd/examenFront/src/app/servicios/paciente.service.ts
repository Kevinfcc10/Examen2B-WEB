import {UsuariosInterface} from "../interfaces/usuario.interface";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PacieneInterface} from "../interfaces/paciene.interface";

@Injectable()
export class PacienteService {

  public static pacienteSelect: PacieneInterface;
  constructor(private consulta: HttpClient) {
  }

  obtenerAllPaciente(){
    return this.consulta.get('http://localhost:1337/Paciente/mostrarPacientes');
  }

  obtenerPacientebusqueda(busqueda:string){
    return this.consulta.get('http://localhost:1337/Paciente/'+busqueda);
  }

}
