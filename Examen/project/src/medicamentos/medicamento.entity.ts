import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";

@Entity('medicamento')
export class MedicamentoEntity {

    @PrimaryGeneratedColumn()
    id_medicamento: number;
    @Column()
    gramosAIngerir: number;
    @Column()
    nombre: string;
    @Column()
    composicion: string;
    @Column()
    usadoPara: string;
    @Column()
    fechaCaducidad: Date;
    @Column()
    numeroPastillas: number;


    @ManyToOne(
        type => PacienteEntity,
        medicamentoEntity => medicamentoEntity.medicamentoId)
    pacienteId: number;

}
