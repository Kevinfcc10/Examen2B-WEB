import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../servicios/usuario.service";
import {MedicamentosInterface} from "../interfaces/medicamentos.interface";
import {TransferenciaService} from "../servicios/transferencia.service";
import {TransferenciaInterface} from "../interfaces/transferencia.interface";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombreUser='';
  img_user='';
  estado1=false;
  estado2=false;
  estadoEspera=false;
  estadoConfirmar=false;
  counterEspera=1;
  counterConfirmar=1;

  /*Arrays para el componente Peticion-Espera*/
  transferencia:Array<TransferenciaInterface>
  transferenciaAux:Array<TransferenciaInterface>

  transferenciaconfirmar:Array<TransferenciaInterface>
  transferenciaconfirmarAux:Array<TransferenciaInterface>

  constructor(
    private transferService:TransferenciaService
  ) { }

  ngOnInit() {
    if(UsuarioService.userLogin != 0){

      this.nombreUser = UsuarioService.usuarioLogin[0].nombre_usuario;
      this.img_user = UsuarioService.usuarioLogin[0].img_usuario;

      const observableTransfer1$ = this.transferService.transferenciaEspera(UsuarioService.userLogin);
      observableTransfer1$.subscribe(
        (results:any)=>{

          if(results.estado === "404 Not found"){
            this.estado1 = false;
            this.estadoEspera = false;
            console.log('no hay transferencias en espera')
          }
          else{
            this.estado1 = true;
            this.transferencia = results;
            this.transferenciaAux = this.transferencia.slice(0,1);
            if(this.transferencia.length === 1){
              this.estadoEspera = false;
            }
            else{
              this.estadoEspera = true;
            }
          }
        }
      );

      const observableTransfer2$ = this.transferService.transferenciaConfirmar(UsuarioService.userLogin);
      observableTransfer2$.subscribe(
        (results:any)=>{

          if(results.estado != "404 Not found"){
            this.estado2 = true;
            this.transferenciaconfirmar = results;
            this.transferenciaconfirmarAux =  this.transferenciaconfirmar.slice(0,1);
            if(this.transferenciaconfirmar.length === 1){
              this.estadoConfirmar = false;
            }else{
              this.estadoConfirmar = true;
            }
          }
          else{
            this.estado2 = false;
            this.estadoConfirmar = false;
            console.log('no hay transferencias por confirmar')
          }
        }
      );
    }
  }

  cargarMasEspera(){

    if(this.counterEspera === this.transferencia.length - 1){
      this.counterEspera = 1;
      this.transferenciaAux = this.transferencia.slice(0,this.transferencia.length)
      this.estadoEspera = false;
    }
    else {
      this.counterEspera += 1;
      this.transferenciaAux =  this.transferencia.slice(0,this.counterEspera)
      this.estadoEspera = true;
    }

  }

  cargarMasConfirmar(){
    if(this.counterConfirmar === this.transferenciaconfirmar.length - 1){
      this.counterConfirmar = 1;
      this.transferenciaconfirmarAux = this.transferenciaconfirmar.slice(0,this.transferenciaconfirmar.length)
      this.estadoConfirmar = false;
    }
    else {
      this.counterConfirmar += 1;
      this.transferenciaconfirmarAux =  this.transferenciaconfirmar.slice(0,this.counterConfirmar)
      this.estadoConfirmar = true;
    }
  }
}
