import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {UsuarioService} from "../servicios/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _httpClient: HttpClient,
              private _router: Router
  ) {
  }
  password = '';
  user = '';
  usuario;

  ngOnInit() {

    if (this.user.length === 0 || this.password.length === 0) {
      console.log('ingrese correctamente los valores')
    } else {
      let observableUsuario$ = this._httpClient.get('http://localhost:1337/Usuario/loginUsuario/' + this.user + '&' + this.password);
      observableUsuario$.subscribe(
        results => {
          //console.log(results);
          this.usuario = results;
          if (this.usuario.length === undefined) {
            console.log('no se obtuvo el id del usuario');
          }
          else {
            UsuarioService.userLogin = this.usuario[0].id_usuario;
            console.log('El id del usuario logueado es:  ' + UsuarioService.userLogin);
            this._router.navigate(['/home']);
          }
        },
        (error) => {
          console.log('Error', error);
        },
      );
    }
  }
}

