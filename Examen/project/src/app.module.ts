import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PacienteController} from "./paciente/paciente.controller";
import {MedicamentoController} from "./medicamentos/medicamento.controller";
import {AutorizacionController} from "./controladores/autorizacion.controller";
import {PacienteService} from "./paciente/paciente.service";
import {MedicamentoService} from "./medicamentos/medicamento.service";

@Module({
  imports: [],
  controllers: [AppController, PacienteController, MedicamentoController, AutorizacionController],
  providers: [AppService, PacienteService, MedicamentoService],
})
export class AppModule {}
