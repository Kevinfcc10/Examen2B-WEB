import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  @Input() imagen: string;
  @Input() texto: string;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  seleccionoPaciente() {
    console.log('Selecciono', this.texto);
    this.selecciono.emit(this.texto);
  }

}
