import { Component, OnInit } from '@angular/core';
import {UsuarioInterface} from "../interfaces/usuario.interface";
import {UsuarioService} from "../servicios/usuario.service";
import {MedicamentosInterface} from "../interfaces/medicamentos.interface";
import {MedicamentoService} from "../servicios/medicamento.service";
import {PeticionComponent} from "../peticion/peticion.component";

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  nombreUser:string;
  img_user:string
  numeroHijos='';


  medicamentos: Array<MedicamentosInterface>
  medicamentosAux: Array<MedicamentosInterface>
  medicamentosSel: Array<MedicamentosInterface>

  constructor(
    private medicamentoService: MedicamentoService,
  ) { }

  ngOnInit() {

    if(UsuarioService.userLogin!=0){
      this.nombreUser = UsuarioService.usuarioLogin[0].nombre_usuario;
      this.img_user = UsuarioService.usuarioLogin[0].img_usuario;

      //console.log('El id del medicamento seleccionado fue: ' + MedicamentoService.medSelecionado)
      const observableMedicamento$ = this.medicamentoService.obtenerMedicamentoId(MedicamentoService.medSelecionado);
      observableMedicamento$.subscribe(
        (results:any) => {

          if(results  != undefined){
            this.medicamentosSel = results;
          }
          else{
            this.numeroHijos='No tiene Medicamentos';
          }
        },
      );

      const observableMed$ = this.medicamentoService.obtenerMedicamentoUsuario(UsuarioService.userLogin);
      observableMed$.subscribe(
        (results:any) => {
          this.medicamentos = results;
          if(this.medicamentos.length != undefined){
            this.numeroHijos= this.medicamentos.length.toString();
            this.medicamentosAux = results;
          }
          else{
            this.numeroHijos='No tiene Medicamentos';
          }
        },
      );
    }


  }

}
