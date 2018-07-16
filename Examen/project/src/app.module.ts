import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PacienteController} from "./paciente/paciente.controller";
import {MedicamentoController} from "./medicamentos/medicamento.controller";
import {AutorizacionController} from "./controladores/autorizacion.controller";
import {PacienteService} from "./paciente/paciente.service";
import {MedicamentoService} from "./medicamentos/medicamento.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteEntity} from "./paciente/paciente.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MedicamentoEntity} from "./medicamentos/medicamento.entity";
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioController} from "./usuario/usuario.controller";

@Module({
  imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'web2018aexamen.mysql.database.azure.com',
        port: 3306,
        username: 'KevinDB@web2018aexamen',
        password: 'Web2018A',
        database: 'WebExamen',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true
      }),

      /*TypeOrmModule.forFeature([UsuarioEntity,], 'userConnection'),
      TypeOrmModule.forFeature([PacienteEntity,],'patientConnection'),
      TypeOrmModule.forFeature([MedicamentoEntity,],'medicineConnection'),
       */
      TypeOrmModule.forFeature([
          PacienteEntity,
          UsuarioEntity,
          MedicamentoEntity,
      ]),
  ],
  controllers: [AppController, PacienteController, MedicamentoController, AutorizacionController, UsuarioController],
  providers: [AppService, PacienteService, MedicamentoService, UsuarioService],
})
export class AppModule {}
