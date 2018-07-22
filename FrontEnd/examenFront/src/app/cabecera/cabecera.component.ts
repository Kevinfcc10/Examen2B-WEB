import {Component, Input, OnInit} from '@angular/core';
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  nombre1: string;
  imagen1: string;

  usuarioCabecera: UsuarioInterface;


  constructor(
    private servicioUser: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit() {

    if(UsuarioService.userLogin === 0){
      console.log('No puede obtener usuario')
    }
    else{
      const observableUsuarios$ = this.servicioUser.obtenerUserId(UsuarioService.userLogin);
      observableUsuarios$.subscribe(
        (results:any) => {
          this.usuarioCabecera = results;
          UsuarioService.usuarioLogin = this.usuarioCabecera;
          this.nombre1 = this.usuarioCabecera[0].nombre_usuario;
          this.imagen1 = this.usuarioCabecera[0].img_usuario;
        },
      );
    }
  }

  IrPerfil(){
    this._router.navigate(['/perfil']);
  }
}
