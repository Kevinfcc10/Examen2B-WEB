import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PacienteService} from "../servicios/paciente.service";
import {PeticionComponent} from "../peticion/peticion.component";
import {UsuarioService} from "../servicios/usuario.service";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers: [PacienteService]
})
export class PacienteComponent implements OnInit {


  @Input() imagen: string;
  @Input() nombre: string;
  @Input() apellido: string;
  @Input() idPac: number;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();

  constructor(private _router: Router,) { }

  ngOnInit() {

  }

  seleccionoPaciente() {
    this.selecciono.emit( this.nombre);
    console.log('Selecciono paciente ' + this.nombre + ' con id: ' + this.idPac)
    PeticionComponent.idPac = this.idPac;
    console.log('sklafhaksjdfhdkjsf    ' + UsuarioService.userSelect)
    this._router.navigate(['/peticion']);
  }

}
