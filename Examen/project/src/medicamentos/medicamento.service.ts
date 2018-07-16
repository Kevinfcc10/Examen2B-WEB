import {Component} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {Like, Repository} from "typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";
import {MedicamentoData} from "./medicamento.data";

@Component()
export class MedicamentoService {

    constructor(
        @InjectRepository(MedicamentoEntity)
        private readonly medicamentoRepository: Repository<MedicamentoEntity>
    ){}
    medicamentos: Medicamento[] = [];

    //Metodo Listar Todos los medicamentos
    async  listarMedicamento(): Promise<MedicamentoEntity[]>{
        //console.log(await this.pacienteRepository.find());
        return (await this.medicamentoRepository.find());
    }


    crearMedicamento(medicamento: Medicamento){
        const med = new MedicamentoEntity();

        med.gramosAIngerir = medicamento.gramosAIngerir;
        med.nombre = medicamento.nombre;
        med.composicion = medicamento.composicion;
        med.usadoPara = medicamento.usadoPara;
        med.fechaCaducidad = new Date(medicamento.fechaCaducidad);
        med.numeroPastillas = medicamento.numeroPastillas;
        med.pacienteId = medicamento.pacienteIdIdPaciente;

        this.medicamentoRepository.save(med);
    }

    crearTodosMedicamentos(){
        for (var indice in MedicamentoData){
            const med = new MedicamentoEntity();
            med.gramosAIngerir = MedicamentoData[indice].gramosAIngerir;
            med.nombre = MedicamentoData[indice].nombre;
            med.composicion = MedicamentoData[indice].composicion;
            med.usadoPara = MedicamentoData[indice].usadoPara;
            med.fechaCaducidad = new Date(MedicamentoData[indice].fechaCaducidad);
            med.numeroPastillas = parseInt(MedicamentoData[indice].numeroPastillas);
            med.pacienteId = parseInt(MedicamentoData[indice].pacienteIdIdPaciente);

            this.medicamentoRepository.save(med);
        }
    }

    async buscarMedLike(name: string): Promise<MedicamentoEntity[]> {

        return (await this.medicamentoRepository.find({nombre:Like('%'+name+'%')}));
    }










    //Metodo obtener un medicamento
    obtenerUno(medicamentoID){

        console.log(this.medicamentos[medicamentoID]);
        return this.medicamentos[medicamentoID];
    }

    //Metodo editar un medicamento
    editarUno(medicamentoID, gramosAIngerir, nombre, composicion, usadoPara, fechaCaducidad, numeroPastillas, pacienteId){
        let medicamentoActualizado = this.obtenerUno(medicamentoID);

        medicamentoActualizado.gramosAIngerir = gramosAIngerir;
        medicamentoActualizado.nombre = nombre;
        medicamentoActualizado.composicion = composicion;
        medicamentoActualizado.usadoPara = usadoPara;
        medicamentoActualizado.fechaCaducidad = fechaCaducidad;
        medicamentoActualizado.numeroPastillas = numeroPastillas;
        medicamentoActualizado.pacienteIdIdPaciente = pacienteId;

        return medicamentoActualizado;
    }

}


export class Medicamento {
    constructor(
        public gramosAIngerir:number,
        public nombre:string,
        public composicion:string,
        public usadoPara:string,
        public fechaCaducidad:string,
        public numeroPastillas:number,
        public pacienteIdIdPaciente:number,
    ){};
}