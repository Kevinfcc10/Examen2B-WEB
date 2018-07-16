import {MedicamentosInterface} from "../interfaces/medicamentos.interface";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UsuariosInterface} from "../interfaces/usuario.interface";

@Injectable()
export class UsuarioService {

  public static userSelect: UsuariosInterface;
  constructor(private consulta: HttpClient) {
  }

  obtenerAllUser(){
    return this.consulta.get('http://localhost:1337/Usuario/mostrarUsuarios');
  }

  obtenerUserbusqueda(busqueda:string){
    return this.consulta.get('http://localhost:1337/Usuario/'+busqueda);
  }

}
