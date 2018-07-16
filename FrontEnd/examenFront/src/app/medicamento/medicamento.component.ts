import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {

  @Input() imagen: string;
  @Input() texto: string;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  seleccionoMed() {
    console.log('Selecciono', this.texto);
    this.selecciono.emit(this.texto);
  }

}
