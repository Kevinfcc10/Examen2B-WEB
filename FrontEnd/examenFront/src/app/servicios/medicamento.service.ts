import {Injectable} from "@angular/core";
import {MedicamentosInterface} from "../interfaces/medicamentos.interface";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MedicamentoService {

  public static medSelect: MedicamentosInterface;
  constructor(private consulta: HttpClient) {
  }

  obtenerAllMedicamentos(){
    return this.consulta.get("http://localhost:1337/Medicamento/mostrarMedicamentos");
  }

  obtenerMedicamentosbusqueda(busqueda:string){
    return this.consulta.get('http://localhost:1337/Medicamento/'+busqueda);
  }

}
