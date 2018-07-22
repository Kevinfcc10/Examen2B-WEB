import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PacieneInterface} from "../interfaces/paciene.interface";
import {PacienteService} from "../servicios/paciente.service";
import {MedicamentoService} from "../servicios/medicamento.service";
import {MedicamentosInterface} from "../interfaces/medicamentos.interface";
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.css']
})

export class PeticionComponent implements OnInit{

  public static idPac: number = 0;
  @Input() counter2:number = 0;
  numeroHijos='';
  estadoContainer=true;

  usuarios:Array<UsuarioInterface>
  pacientes:Array<PacieneInterface>
  pacientesAux:Array<PacieneInterface>
  medicamentos: Array<MedicamentosInterface>
  medicamentosAux: Array<MedicamentosInterface>

  constructor(private pacienteService: PacienteService,
              private medicamentoService: MedicamentoService,
              private servicioUser: UsuarioService,
  ) {

  }

  ngOnInit() {

    if(UsuarioService.userSelect === 0 && PeticionComponent.idPac === 0){
      console.log('no ha elegido ningun paciente')
    }
    else{
      if(UsuarioService.userSelect != 0){
        this.estadoContainer = false;
        const observableUsuarios$ = this.servicioUser.obtenerUserId(UsuarioService.userSelect);
        observableUsuarios$.subscribe(
          (results:any) => {
            this.usuarios = results;
          },
        );

        const observablePaciente$ = this.pacienteService.obtenerPacientesPorUsuario(UsuarioService.userSelect);
        observablePaciente$.subscribe(
          (results:any)=>{
            this.pacientes = results;
            this.pacientesAux = results;
          }
        )
      }

      if(PeticionComponent.idPac != 0){
        this.estadoContainer = true;
        const observableUsuarios$ = this.servicioUser.obtenerUserDadoPaciente(PeticionComponent.idPac);
        observableUsuarios$.subscribe(
          (results:any) => {
            this.usuarios = results;
            UsuarioService.userSelect = this.usuarios[0].id_usuario;
          },
        );

        const observablePaciente$ = this.pacienteService.obtenerPacienteid(PeticionComponent.idPac);
        observablePaciente$.subscribe(
          (results:any)=>{
            this.pacientes = results;
            this.pacientesAux = results
          }
        )

        const observableMed$ = this.medicamentoService.obtenerMedicamentoPaciente(PeticionComponent.idPac);
        observableMed$.subscribe(
          (results:any) => {
            this.medicamentos = results;
            if(this.medicamentos.length != undefined){
              this.medicamentosAux = results;
              this.numeroHijos= this.medicamentos.length.toString();
            }
            else{
              this.numeroHijos='No tiene Medicamentos';
            }
          },
        );
      }
    }
  }


  /*Metodos para poder mostrar los 2 siguientes y 2 anteriores  pacientes*/
  aumentarContador1(){
    this.counter2 = this.counter2 + 1;
    this.pacientesAux = this.pacientes.slice(this.counter2, this.pacientes.length);
    PeticionComponent.idPac = this.pacientes[this.counter2 ].id_paciente;
  }
  disminuirContador1(){
    this.counter2 = this.counter2 - 1;
    this.pacientesAux = this.pacientes.slice(this.counter2, this.pacientes.length);
    PeticionComponent.idPac = this.pacientes[this.counter2 ].id_paciente;
  }

  seleccion(){
    //UsuarioService.userSelect = 0;
    this.estadoContainer = true;
    this.ngOnInit()
  }
}

