import {Component, Input, OnInit} from '@angular/core';
import {MedicamentosInterface} from "../interfaces/medicamentos.interface";
import {MedicamentoService} from "../servicios/medicamento.service";
import {PeticionComponent} from "../peticion/peticion.component";
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";
import {PacienteService} from "../servicios/paciente.service";
import {PacieneInterface} from "../interfaces/paciene.interface";
import {Router} from "@angular/router";
import {TransferenciaService} from "../servicios/transferencia.service";

@Component({
  selector: 'app-peticion-aceptar',
  templateUrl: './peticion-aceptar.component.html',
  styleUrls: ['./peticion-aceptar.component.css']
})
export class PeticionAceptarComponent implements OnInit {

  @Input() idAceptarRechazar:number=0;
  usuarios:Array<UsuarioInterface>


  //Item1
  @Input() idSeleccionado: number = 0;
  nombreItem1 = '';
  imagenItem1 = '';
  MedicamentosItem1: MedicamentosInterface

  //item2
  @Input() idSeleccionado2: number = 0;
  nombreItem2 = '';
  imagenItem2 = '';
  MedicamentosItem2: MedicamentosInterface

  paciente: Array<PacieneInterface>

  constructor(
    private medicamentoService: MedicamentoService,
    private usuarioService: UsuarioService,
    private servicioPaciente : PacienteService,
    private transferService: TransferenciaService,
    private _router: Router
    ) {}

  ngOnInit() {
    if (this.idSeleccionado != 0 && this.idSeleccionado2 != 0) {
      const observable1$ = this.medicamentoService.obtenerMedicamentoId(this.idSeleccionado);
      observable1$.subscribe(
        (result: any) => {
          this.MedicamentosItem1 = result;
          this.nombreItem1 = this.MedicamentosItem1[0].nombre
          this.imagenItem1 = this.MedicamentosItem1[0].img_med
          console.log(this.MedicamentosItem1)
        }
      );

      const observableUsuarios$ = this.usuarioService.obtenerUsuarioDadoMedicamento(this.idSeleccionado)
      observableUsuarios$.subscribe(
        (results:any) => {
          this.usuarios = results;
        },
      );

      const observable2$ = this.medicamentoService.obtenerMedicamentoId(this.idSeleccionado2);
      observable2$.subscribe(
        (result: any) => {
          this.MedicamentosItem2 = result;
          this.nombreItem2 = this.MedicamentosItem2[0].nombre
          this.imagenItem2 = this.MedicamentosItem2[0].img_med
        }
      );
    }
  }

  AceptarTransferencia(){

    const observablePac2$ = this.servicioPaciente.obtenerPaciente(this.MedicamentosItem1[0].id_medicamento);
    observablePac2$.subscribe(
      (results:any) => {
        this.paciente = results;
        console.log("los valores son : " +this.MedicamentosItem2[0].id_medicamento + "    " +this.paciente[0].id_paciente)
        this.medicamentoService.updatePaciente(this.MedicamentosItem2[0].id_medicamento,this.paciente[0].id_paciente);
      },
    )

    const observablePac1$ = this.servicioPaciente.obtenerPaciente(this.MedicamentosItem2[0].id_medicamento);
    observablePac1$.subscribe(
      (results:any) => {
        this.paciente = results;
        console.log("los valores son: " + this.MedicamentosItem1[0].id_medicamento + " " + this.paciente[0].id_paciente)
        this.medicamentoService.updatePaciente(this.MedicamentosItem1[0].id_medicamento,this.paciente[0].id_paciente);
      },
    )


    this.transferService.updateEstado(this.idAceptarRechazar,'aceptado')

    this._router.navigate(['/home']);
  }

  RechazarTransferencia() {

    this.transferService.updateEstado(this.idAceptarRechazar,'rechazado')
    this._router.navigate(['/home']);
  }
}
