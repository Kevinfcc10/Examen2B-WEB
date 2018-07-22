import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MedicamentoService} from "../servicios/medicamento.service";
import {TransferenciaService} from "../servicios/transferencia.service";
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {

  @Input() imagen: string;
  @Input() nombre: string;
  @Input() pastillas: string;
  @Input() idMedicamento:number;
  @Input() idMedicamentoInter:number;
  @Input() estado:boolean = true;
  @Input() estado2:boolean = true;

  usuarios:Array<UsuarioInterface>

  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor(private _router: Router,
              private transferenciaServicio :TransferenciaService,
              private servicioUser: UsuarioService) { }

  ngOnInit() {

    if(UsuarioService.userSelect === 0){
      const observableUsuarios$ = this.servicioUser.obtenerUsuarioDadoMedicamento(MedicamentoService.medSelecionado);
      observableUsuarios$.subscribe(
        (results:any) => {
          this.usuarios = results;
          UsuarioService.userSelect = this.usuarios[0].id_usuario;
        },
      );


    }
    if(UsuarioService.userSelect != 0){
      console.log('no hay usuario')
    }

  }

  pedirTransferencia() {

    console.log('Pidio transferencia de ', this.nombre + ' con id:' + this.idMedicamento);
    MedicamentoService.medSelecionado = this.idMedicamento
    this.selecciono.emit(this.nombre);
    this._router.navigate(['/seleccion']);
  }

  seleccionarTransferencia(){
    console.log('Selecciono ', this.nombre + ' con id:' + this.idMedicamentoInter)
    MedicamentoService.medIntercambio = this.idMedicamentoInter;
    this.selecciono.emit(this.nombre);

    this.transferenciaServicio.registrarPeticion(UsuarioService.userLogin,UsuarioService.userSelect,
      MedicamentoService.medIntercambio,MedicamentoService.medSelecionado);
    this._router.navigate(['/perfil']);
  }

}
