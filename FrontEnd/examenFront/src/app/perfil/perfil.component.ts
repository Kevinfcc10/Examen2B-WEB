import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../servicios/usuario.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombreUser='';
  img_user='';
  constructor() { }

  ngOnInit() {
    if(UsuarioService.userLogin != 0){

        this.nombreUser = UsuarioService.usuarioLogin[0].nombre_usuario;
        this.img_user = UsuarioService.usuarioLogin[0].img_usuario;

    }
  }

}
