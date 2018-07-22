import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UsuarioService} from "../servicios/usuario.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() nombre: string;
  @Input() imagen: string;
  @Input() idUser: number;
  @Input() estado: boolean = true;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  seleccionoUsuario() {
    console.log('Selecciono ' + this.nombre + '  con id: ' + this.idUser);
    this.selecciono.emit(this.nombre);
    UsuarioService.userSelect = this.idUser;
    this._router.navigate(['/peticion']);
  }

}
