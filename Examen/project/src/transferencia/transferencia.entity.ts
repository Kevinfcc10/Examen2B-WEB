import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('transferencia')
export class TransferenciaEntity {
    @PrimaryGeneratedColumn()
    id_transferencia:number;
    @Column()
    idUsuarioRealiza:number;
    @Column()
    idUsuarioEspera:number;
    @Column()
    idMedicamento1:number;
    @Column()
    idMedicamento2:number;
    @Column()
    idPaciente1:number
    @Column()
    idPaciente2:number
    @Column()
    estadoPeticion:string;

}