import {Component, Post} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {createQueryBuilder, Equal, getRepository, In, Like, Not, Repository} from "typeorm";
import {MedicamentoData} from "./medicamento.data";
import {PacienteEntity} from "../paciente/paciente.entity";
import {PacienteService} from "../paciente/paciente.service";

@Component()
export class MedicamentoService {

    constructor(
        @InjectRepository(MedicamentoEntity)
        private readonly medicamentoRepository: Repository<MedicamentoEntity>,
        private  pacienteService: PacienteService

    ){}
    medicamentos: Medicamento[] = [];

    //Metodo para crear un medicamento
    crearMedicamento(medicamento: Medicamento){
        const med = new MedicamentoEntity();

        med.gramosAIngerir = medicamento.gramosAIngerir;
        med.nombre = medicamento.nombre;
        med.composicion = medicamento.composicion;
        med.usadoPara = medicamento.usadoPara;
        med.fechaCaducidad = new Date(medicamento.fechaCaducidad);
        med.numeroPastillas = medicamento.numeroPastillas;
        med.pacienteId = medicamento.pacienteIdIdPaciente;
        med.img_med = medicamento.img_med;

        this.medicamentoRepository.save(med);
    }
    //metodo para registrar los medicamentos quemados en la app
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
            med.img_med = MedicamentoData[indice].img_med;

            this.medicamentoRepository.save(med);
        }
    }


    //listar todos los medicamentos que no pertenecen a los pacientes de un determinado usuario
    async  listarMedicamentoPacienteUsuario(idUser:number): Promise<MedicamentoEntity[]>{
        /*let promise = Promise.resolve(this.pacienteService.listarIdsPacienteOtrosUsuarios(1));*/

        const joinExample = await this.medicamentoRepository.createQueryBuilder("medicamento")
            .innerJoin("medicamento.pacienteId", "med") //representa a la entidad paciente
            .innerJoin("med.medicamentoId", "medPac") //representa a la entidad medicamento
            .where( "med.usuarioFK != :id")
            .setParameter("id", idUser)
            .getMany();
        //console.log(joinExample)
        return (joinExample);
    }


    //listar todos los medicamentos que no pertenecen a los pacientes de un determinado usuario con busqueda con Like
    async  busquedaLike(name:string,idUser:number): Promise<MedicamentoEntity[]>{

        const joinMedicamentoPaciente = await this.medicamentoRepository.createQueryBuilder("medicamento")
            .innerJoin("medicamento.pacienteId", "pac") //representa a la entidad paciente
            .innerJoin("pac.medicamentoId", "med") //representa a la entidad medicamento
            .where("pac.usuarioFK != :id",{id:idUser})
            .andWhere("medicamento.nombre like :names", {names: '%' +  name + '%' })
            .getMany();
        //console.log(joinMedicamentoPaciente)
        /*var data = await  getRepository(MedicamentoEntity)
            .createQueryBuilder("med")
            .where("med.nombre like :names", {names: '%' +  name + '%' })
            .getMany();*/

        return (joinMedicamentoPaciente);
    }

    //Metodo para buscar el/los medicamentos por un determinado paciente
    async buscarMedPac(id: number): Promise<MedicamentoEntity[]> {
        return (await this.medicamentoRepository.find({pacienteId:Equal(id)}));
    }

    //Metodo para buscar el/los medicamentos del usuario logeado
    async  listarMedicamentoUsuario(idUser:number): Promise<MedicamentoEntity[]>{
        const joinExample = await this.medicamentoRepository.createQueryBuilder("medicamento")
            .innerJoin("medicamento.pacienteId", "med") //representa a la entidad paciente
            .innerJoin("med.medicamentoId", "medPac") //representa a la entidad medicamento
            .where( "med.usuarioFK = :id")
            .setParameter("id", idUser)
            .getMany();
        return (joinExample);
    }

    //Metodo obtener un medicamento
    async obtenerUno(idMed:number): Promise<MedicamentoEntity[]>{
        return (await this.medicamentoRepository.find({id_medicamento:Equal(idMed)}))
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
        public img_med:string
    ){};
}