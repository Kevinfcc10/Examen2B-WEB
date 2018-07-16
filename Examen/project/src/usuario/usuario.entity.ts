import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario: number;
    @Column()
    nombre_usuario: string;
    @Column()
    password_usuario: string;

    @OneToMany(
        type => PacienteEntity,
        usuarioEntity => usuarioEntity.usuarioFK)
    pacienteId: number;


}