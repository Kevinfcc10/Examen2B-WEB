import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _httpClient: HttpClient,
              private _router: Router,
              private  home: HomeComponent
  ) {
  }

  password = '';
  user = '';
  usuario;

  ngOnInit() {

    if (this.user.length === 0 || this.password.length === 0) {
      console.log('ingrese correctamente los valores')
    } else {
      const observableUsuario$ = this._httpClient.get('http://localhost:1337/Usuario/' + this.user + '&' + this.password);
      observableUsuario$.subscribe(
        results => {
          //console.log(results);
          this.usuario = results;
          if (this.usuario.length === undefined) {
            console.log('no se obtuvo el id del usuario');
          }
          else {
            console.log(this.usuario[0].id_usuario);
            //this.home.obtenerDatosUsuario(this.usuario[0].id_usuario);
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

