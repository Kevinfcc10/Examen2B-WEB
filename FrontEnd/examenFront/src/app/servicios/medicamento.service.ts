import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class MedicamentoService {

  public static medSelecionado: number;
  public static medIntercambio: number;

  constructor(private consulta: HttpClient) {
  }

  //obtener todos los medicamentos que no pertenecen a los pacientes de un determinado usuario
  obtenerAllMedicamentos(iduser:number){
    return this.consulta.get("http://localhost:1337/Medicamento/mostrarMedicamentos/"+iduser);
  }

  //busqueda con el operador Like de el o los medicamentos que no pertenecen a los pacientes de un determinado usuario
  obtenerMedicamentosbusqueda(busqueda:string, idUser:number){
    return this.consulta.get('http://localhost:1337/Medicamento/busquedaMedicamentos/'+busqueda+'&'+idUser);
  }

  //busqueda de el/los medicamentos de un determinado paciente
  obtenerMedicamentoPaciente(idPac:number){
    return this.consulta.get('http://localhost:1337/Medicamento/listarMedicamentos/paciente/'+idPac);
  }

  //busqueda de el/los medicamentos del usuario logeado
  obtenerMedicamentoUsuario(idUser:number){
    return this.consulta.get('http://localhost:1337/Medicamento/listarMedicamentos/usuario/'+idUser);
  }

  //obtener un determinado medicamento en base a su id
  obtenerMedicamentoId(idMed:number){
    return this.consulta.get('http://localhost:1337/Medicamento/medicamento/'+idMed)
  }

  //actualizar el paciente al que pertenece un medicamento
  updatePaciente(idMed:number, idPac:number){
    let headers  = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let body = new HttpParams();

    body = body.set('idMed', idMed.toString());
    body = body.set('idPac', idPac.toString());

    return this.consulta.post('http://localhost:1337/Medicamento/update/', body,{headers: headers}).subscribe();

  }

}
