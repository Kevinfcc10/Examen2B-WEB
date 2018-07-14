import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {MedicamentoEntity} from "../medicamentos/medicamento.entity";

@Entity('paciente')
export class PacienteEntity {

    @PrimaryGeneratedColumn()
    id_paciente: number;
    @Column()
    nombres: string;
    @Column()
    apellidos: string;
    @Column()
    fechaNacimiento: Date;
    @Column()
    hijos: number;
    @Column()
    tieneSeguro: boolean;

    @ManyToOne(
        type => UsuarioEntity,
        pacienteEntity => pacienteEntity.pacienteId)
    usuarioFK: number;

    @OneToMany(
        type => MedicamentoEntity,
        pacienteEntity => pacienteEntity.pacienteId)
    medicamentoId: number;

}