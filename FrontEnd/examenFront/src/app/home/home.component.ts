import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _httpClient: HttpClient,
              private _router: Router) {}

  paciente1; usuarios1; medicamento1;
  userLike = '';
  pacientes: Pacientes[] = [];
  pacienteAux: Pacientes[] = [];
  usuarios: Usuarios[] = [];
  usuarioAux: Usuarios[] = [];
  medicamento: Medicamentos[] = [];
  medicamentoAux: Medicamentos[] = [];
  @Input() counter:number = 0;
  @Input() counter2:number = 0;
  @Input() counter3:number = 0;
  @Input() estado:boolean =false;


  ngOnInit() {

    this.usuarios = [];
    this.pacientes = [];
    if (this.userLike.length === 0) {
      if (this.estado == true) {
        const observableUsuarios$ = this._httpClient.get('http://localhost:1337/Usuario/mostrarUsuarios');
        observableUsuarios$.subscribe(
          results => {
            this.obtenerUsuarios(results);
          },
          (error) => {
            console.log('Error', error);
          },
        );

        const observablePacientes$ = this._httpClient.get('http://localhost:1337/Paciente/mostrarPacientes');
        observablePacientes$.subscribe(
          results => {
            this.obtenerPacientes(results);
          },
          (error) => {
            console.log('Error', error);
          },
        );

        const observableMedicamentos$ = this._httpClient.get('http://localhost:1337/Medicamento/mostrarMedicamentos');
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
      const observableUsuariosLike$ = this._httpClient.get('http://localhost:1337/Usuario/'+this.userLike);
      observableUsuariosLike$.subscribe(
        results=>{
          this.usuarios1 = results;
          if(this.usuarios1.length === undefined){
            const observableUsuariosLike$ = this._httpClient.get('http://localhost:1337/Usuario/mostrarUsuarios');
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

      const observablePacLike$ = this._httpClient.get('http://localhost:1337/Paciente/'+this.userLike);
      observablePacLike$.subscribe(
        results=>{
          this.paciente1 = results;
          if(this.paciente1.length === undefined){
            const observablePacLike$ = this._httpClient.get('http://localhost:1337/Paciente/mostrarPacientes');
            observablePacLike$.subscribe(
              results=>{
                this.obtenerPacientes(results);
              });
          }else{
            this.obtenerPacientes(results);
          }
        }
      );

      const observableMedLike$ = this._httpClient.get('http://localhost:1337/Medicamento/'+this.userLike);
      observableMedLike$.subscribe(
        results=>{
          this.medicamento1 = results;
          if(this.medicamento1 === undefined){
            const observableMedLike$ = this._httpClient.get('http://localhost:1337/Medicamento/mostrarMedicamentos');
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
    this.usuarios1=result;
    if (this.usuarios1.length === undefined) {
      console.log('no se obtuvo ningun usuario');
    }
    else {
      var i: number = 1;
      for (var indice in this.usuarios1) {

        const user = new Usuarios(
          this.usuarios1[indice].nombre_usuario,
          this.usuarios1[indice].id_usuario,
          '/assets/perfil' + i + '.png'
        );
        if (i >= 4) {
          i = 1;
        } else {
          i = i + 1;
        }
        this.crearUsuario(user);
      }
    }
  }

  obtenerPacientes(result){
    this.paciente1=result;
    if (this.paciente1.length === undefined) {
      console.log('no se obtuvo ningun usuario');
    }
    else {
      var i: number = 1;
      for (var indice in this.paciente1) {

        const pac = new Pacientes(
          this.paciente1[indice].nombres,
          this.paciente1[indice].apellidos,
          this.paciente1[indice].id_paciente,
          '/assets/perfil' + i + '.png'
        );
        if (i >= 4) {
          i = 1;
        } else {
          i = i + 1;
        }
        this.crearPaciente(pac);
      }
    }
  }


  obtenerMed(result){
    this.medicamento1=result;
    if (this.medicamento1.length === undefined) {
      console.log('no se obtuvo ningun medicamento');
    }
    else {
      var i: number = 1;
      for (var indice in this.medicamento1) {

        const med = new Medicamentos(
          this.medicamento1[indice].nombre,
          this.medicamento1[indice].composicion,
          this.medicamento1[indice].pastillas,
          '/assets/perfil' + i + '.png'
        );
        if (i >= 4) {
          i = 1;
        } else {
          i = i + 1;
        }
        this.crearMedicamento(med);
      }
    }
  }

  crearPaciente(paciente: Pacientes) {
    this.pacientes.push(paciente);
    this.pacienteAux = this.pacientes.slice(0,this.pacientes.length);
  }
  crearUsuario(usuario: Usuarios) {
    this.usuarios.push(usuario);
    this.usuarioAux = this.usuarios.slice(0,this.usuarios.length);
  }
  crearMedicamento(medicamento: Medicamentos){
    this.medicamento.push(medicamento);
    this.medicamentoAux = this.medicamento.slice(0,this.medicamento.length);
  }

  @Output() public id1 = 0;
  obtenerDatosUsuario(id: number) {

    const observablePacientes$ = this._httpClient.get('http://localhost:1337/Paciente/' + id);
    observablePacientes$.subscribe(
      results => {
        console.log(results);
        this.paciente1 = results;
        var i: number = 1;
        for (var indice in this.paciente1) {

          const pac = new Pacientes(
            this.paciente1[indice].nombres,
            this.paciente1[indice].apellidos,
            this.paciente1[indice].id_paciente,
            '/assets/perfil' + i + '.png'
          );
          if (i >= 4) {
            i = 1;
          } else {
            i = i + 1;
          }
          this.crearPaciente(pac);
          //console.log(this.pacientes);
        }
      },
      (error) => {
        console.log('Error', error);
      },
    );
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
    this.pacienteAux = this.pacientes.slice(valor1*2, this.pacientes.length);
  }

  cargar2(valor1:number){
    this.medicamentoAux = this.medicamento.slice(valor1*4, this.medicamento.length);
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


export class Medicamentos {
  constructor(
    public nombre: string,
    public composicion: string,
    public pastillas: number,
    public imagen: string
  ) {
  };
}

export class Pacientes {
  constructor(
    public nombrePa: string,
    public apellidos: string,
    public id_paciente: number,
    public imagen: string
  ) {
  };
}

export class Usuarios {
  constructor(
    public nombres: string,
    public id_usuario: number,
    public imagen: string
  ) {
  };
}


