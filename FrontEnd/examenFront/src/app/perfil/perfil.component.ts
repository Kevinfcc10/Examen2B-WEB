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

  /*Arrays para el componente Peticion-Espera*/
  transferencia:Array<TransferenciaInterface>
  transferenciaconfirmar:Array<TransferenciaInterface>

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

          if(results != undefined){
            this.transferencia = results;
            /*for(let i=0; i<this.transferencia.length;i++){
              console.log(this.transferencia[i].idMedicamento1)
            }*/
          }
          else{
          }
        }
      );

      const observableTransfer2$ = this.transferService.transferenciaConfirmar(UsuarioService.userLogin);
      observableTransfer2$.subscribe(
        (results:any)=>{

          if(results != undefined){
            this.transferenciaconfirmar = results;
            /*for(let i=0; i<this.transferenciaconfirmar.length;i++){
              console.log(this.transferenciaconfirmar[i].idMedicamento1)
            }*/
          }
          else{
          }
        }
      );
    }
  }
}
