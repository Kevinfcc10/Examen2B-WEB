import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UsuarioService} from "../servicios/usuario.service";
import {PacienteService} from "../servicios/paciente.service";
import {MedicamentoService} from "../servicios/medicamento.service";
import {UsuariosInterface} from "../interfaces/usuario.interface";
import {PacieneInterface} from "../interfaces/paciene.interface";
import {MedicamentosInterface} from "../interfaces/medicamentos.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios:Array<UsuariosInterface>
  usuarioAux:Array<UsuariosInterface>
  pacientes:Array<PacieneInterface>
  pacientesAux:Array<PacieneInterface>
  medicamentos: Array<MedicamentosInterface>
  medicamentosAux: Array<MedicamentosInterface>

  constructor(private _httpClient: HttpClient,
              private _router: Router,
              private servicioUser: UsuarioService,
              private servicioPaciente: PacienteService,
              private servicioMed: MedicamentoService
  ) {}

  paciente1; usuarios1; medicamento1;
  userLike = '';

  @Input() counter:number = 0;
  @Input() counter2:number = 0;
  @Input() counter3:number = 0;
  @Input() estado:boolean =false;


  ngOnInit() {

    this.usuarios = [];
    this.pacientes = [];
    if (this.userLike.length === 0) {
      if (this.estado == true) {
        const observableUsuarios$ = this.servicioUser.obtenerAllUser();
        observableUsuarios$.subscribe(
          (results:any) => {
            this.usuarios = results;
            this.obtenerUsuarios(this.usuarios);
          },
          (error) => {
            console.log('Error', error);
          },
        );

        const observablePacientes$ = this.servicioPaciente.obtenerAllPaciente();
        observablePacientes$.subscribe(
          (results:any) => {
            this.pacientes = results;
            this.obtenerPacientes(this.pacientes);
          },
          (error) => {
            console.log('Error', error);
          },
        );

        const observableMedicamentos$ = this.servicioMed.obtenerAllMedicamentos();
        observableMedicamentos$.subscribe(
          results => {
            this.obtenerMed(results);
          },
          (error) => {
            console.log('Error', error);
          },
        );

      }this.estado = true;

    } else {
      this.estado = false;
      console.log(this.userLike);
      const observableUsuariosLike$ = this.servicioUser.obtenerUserbusqueda(this.userLike);
      observableUsuariosLike$.subscribe(
        results=>{
          this.usuarios1 = results;
          if(this.usuarios1.length === undefined){
            const observableUsuariosLike$ = this.servicioUser.obtenerAllUser();
            observableUsuariosLike$.subscribe(
              results=>{
                this.obtenerUsuarios(results);
              });
          }
          else{
            this.obtenerUsuarios(results);
          }
        }
      );

      const observablePacLike$ = this.servicioPaciente.obtenerPacientebusqueda(this.userLike);
      observablePacLike$.subscribe(
        results=>{
          this.paciente1 = results;
          if(this.paciente1.length === undefined){
            const observablePacLike$ = this.servicioPaciente.obtenerAllPaciente();
            observablePacLike$.subscribe(
              results=>{
                this.obtenerPacientes(results);
              });
          }else{
            this.obtenerPacientes(results);
          }
        }
      );

      const observableMedLike$ = this.servicioMed.obtenerMedicamentosbusqueda(this.userLike);
      observableMedLike$.subscribe(
        results=>{
          this.medicamento1 = results;
          if(this.medicamento1 === undefined){
            const observableMedLike$ = this.servicioMed.obtenerAllMedicamentos();
            observableMedLike$.subscribe(
              results=> {
                this.obtenerMed(results);
              });
          }else{
            this.obtenerMed(results);
          }

        }
      );

    }
  }

  obtenerUsuarios(result){
    this.usuarioAux = result;
  }
  obtenerPacientes(result){
    this.pacientesAux=result;

  }

  obtenerMed(result){
    this.medicamentosAux=result;
  }

  aumentarContador(){
    this.counter = this.counter + 1;
    this.cargar(this.counter);
  }
  disminuirContador(){
    this.counter = this.counter - 1;
    this.cargar(this.counter);
  }

  cargar(valor1:number){
    this.usuarioAux = this.usuarios.slice(valor1*4, this.usuarios.length);
  }


  cargar1(valor1:number){
    this.pacientesAux = this.pacientes.slice(valor1*2, this.pacientes.length);
  }

  cargar2(valor1:number){
    this.medicamentosAux = this.medicamentos.slice(valor1*4, this.medicamentos.length);
  }


  aumentarContador1(){
    this.counter2 = this.counter2 + 1;
    this.cargar1(this.counter2);
  }
  disminuirContador1(){
    this.counter2 = this.counter2 - 1;
    this.cargar1(this.counter2);
  }

  aumentarContador2(){
    this.counter3 = this.counter3 + 1;
    this.cargar2(this.counter3);
  }
  disminuirContador2(){
    this.counter3 = this.counter3 - 1;
    this.cargar2(this.counter3);
  }
}



