import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class TransferenciaService {

  constructor(private consulta: HttpClient){}

  //Registrar una transferencia
  registrarPeticion(idUserLog:number,idUserSel:number,idMedSel:number,idMedSelUser:number,idPac1:number,idPac2:number){

    let headers  = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let body = new HttpParams();
    body = body.set('idUsuarioRealiza', idUserLog.toString());
    body = body.set('idUsuarioEspera', idUserSel.toString());
    body = body.set('idMedicamento1', idMedSel.toString());
    body = body.set('idMedicamento2', idMedSelUser.toString());
    body = body.set('idPaciente1', idPac1.toString());
    body = body.set('idPaciente2', idPac2.toString());
    body = body.set('estadoPeticion', 'espera');

    return this.consulta.post('http://localhost:1337/Transferencia/registrar', body,{headers: headers}).subscribe();
  }

  //actualizar estado de una trasferencia
  updateEstado(idTrans:number, estadoPet:string){
    let headers  = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let body = new HttpParams();

    body = body.set('idTrans', idTrans.toString());
    body = body.set('estadoPet', estadoPet);

    return this.consulta.post('http://localhost:1337/Transferencia/updateEstado', body,{headers: headers}).subscribe();
  }

  //Transferencia en Espera
  transferenciaEspera(idUser:number){
    return this.consulta.get('http://localhost:1337/Transferencia/transferenciaEspera/'+idUser);
  }

  //Transferencias por confirmar
  transferenciaConfirmar(idUser:number){
    return this.consulta.get('http://localhost:1337/Transferencia/transferenciasPorConfirmar/'+idUser);
  }



}
