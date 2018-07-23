import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {MedicamentoService} from "../servicios/medicamento.service";
import {TransferenciaService} from "../servicios/transferencia.service";
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";
import {PacienteService} from "../servicios/paciente.service";
import {PacieneInterface} from "../interfaces/paciene.interface";

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

  idPaciente1:number
  idPaciente2:number

  usuarios:Array<UsuarioInterface>
  paciente:Array<PacieneInterface>
  paciente2:Array<PacieneInterface>

  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor(private _router: Router,
              private transferenciaServicio :TransferenciaService,
              private servicioUser: UsuarioService,
              private servicioPaciente : PacienteService
  ) { }

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

    const observablePac$ = this.servicioPaciente.obtenerPaciente(MedicamentoService.medSelecionado);
    observablePac$.subscribe(
      (results:any) => {
        this.paciente = results;
        PacienteService.pacienteSelect1 = this.paciente[0].id_paciente;
        console.log(this.paciente)
      },
    );


    this.selecciono.emit(this.nombre);
    this._router.navigate(['/seleccion']);
  }

  seleccionarTransferencia(){
    console.log('Selecciono ', this.nombre + ' con id:' + this.idMedicamentoInter)
    MedicamentoService.medIntercambio = this.idMedicamentoInter;

    const observablePac2$ = this.servicioPaciente.obtenerPaciente(MedicamentoService.medIntercambio);
    observablePac2$.subscribe(
      (results:any) => {
        this.paciente2 = results;
        PacienteService.pacienteSelect2 = this.paciente2[0].id_paciente;
        this.transferenciaServicio.registrarPeticion(UsuarioService.userLogin,UsuarioService.userSelect,
          MedicamentoService.medIntercambio,MedicamentoService.medSelecionado,
          PacienteService.pacienteSelect1,PacienteService.pacienteSelect2);
      },
    )
    this.selecciono.emit(this.nombre);

    this._router.navigate(['/perfil']);
  }

}
