import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {PeticionComponent} from "./peticion/peticion.component";
import {SeleccionComponent} from "./seleccion/seleccion.component";
import {PerfilComponent} from "./perfil/perfil.component";

export const RutasApp:Routes=[
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'home',component:HomeComponent,
  },
  {
    path:'peticion', component: PeticionComponent,

  },
  {
    path:'seleccion', component: SeleccionComponent
  },
  {
    path:'perfil', component: PerfilComponent
  }

];

export const routing:ModuleWithProviders=RouterModule.forRoot(RutasApp);
