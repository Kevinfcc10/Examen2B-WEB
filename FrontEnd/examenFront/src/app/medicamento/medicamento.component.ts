import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {

  @Input() imagen: string;
  @Input() texto: string;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor(private _router: Router,) { }

  ngOnInit() {
  }

  seleccionoMed() {
    console.log('Selecciono', this.texto);
    this.selecciono.emit(this.texto);
  }

}
