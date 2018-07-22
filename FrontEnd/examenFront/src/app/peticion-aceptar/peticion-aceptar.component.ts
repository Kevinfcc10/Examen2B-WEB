import {Component, Input, OnInit} from '@angular/core';
import {MedicamentosInterface} from "../interfaces/medicamentos.interface";
import {MedicamentoService} from "../servicios/medicamento.service";
import {PeticionComponent} from "../peticion/peticion.component";
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";

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

  constructor(
    private medicamentoService: MedicamentoService,
    private usuarioService: UsuarioService,
    ) {}

  ngOnInit() {
    if (this.idSeleccionado != 0 && this.idSeleccionado2 != 0) {
      const observable1$ = this.medicamentoService.obtenerMedicamentoId(this.idSeleccionado);
      observable1$.subscribe(
        (result: any) => {
          this.MedicamentosItem1 = result;
          this.nombreItem1 = this.MedicamentosItem1[0].nombre
          this.imagenItem1 = this.MedicamentosItem1[0].img_med
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
    //this.selecciono.emit( this.nombre);
    console.log('Acepto transferencia ' + this.nombreItem2 + ' con id: ' + this.idSeleccionado2)
    //this._router.navigate(['/peticion']);
  }

  RechazarTransferencia(){
    console.log('Rechazo transferencia ' + this.nombreItem2 + ' con id: ' + this.idSeleccionado2)
  }
}
