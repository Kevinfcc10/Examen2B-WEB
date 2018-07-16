import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {RutasApp} from "./app.routes";
import {RouterModule} from "@angular/router";
import { SeleccionComponent } from './seleccion/seleccion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PeticionComponent } from './peticion/peticion.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import {HttpModule} from "@angular/http";
import { PacienteComponent } from './paciente/paciente.component';
import { MedicamentoComponent } from './medicamento/medicamento.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeleccionComponent,
    PerfilComponent,
    PeticionComponent,
    HomeComponent,
    UsuarioComponent,
    PacienteComponent,
    MedicamentoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(
      RutasApp,{
        useHash: true
      }
    )
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
