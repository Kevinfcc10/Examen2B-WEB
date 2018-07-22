import {Component} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TransferenciaEntity} from "./transferencia.entity";
import {Equal, Repository} from "typeorm";

@Component()
export class TransferenciaService {

    constructor(
        @InjectRepository(TransferenciaEntity)
        private readonly transferenciaRepository: Repository<TransferenciaEntity>
    ){}

    //metodo para encontrar todas las transferencias en espera del usuario logueado
    async findAllEspera(idUser:number) : Promise<TransferenciaEntity[]>{
        return (await this.transferenciaRepository.find({
            where:{idUsuarioRealiza:Equal(idUser), estadoPeticion:Equal("espera")}
        }))
    }

    //metodo para encontrar todas las transferencias por aceptar o rechazar (pendientes) del usuario logueado
    async findAllTransfer(idUser:number) : Promise<TransferenciaEntity[]>{
        return (await this.transferenciaRepository.find({
            where:{idUsuarioEspera:Equal(idUser), estadoPeticion:Equal("espera")}
        }))
    }

    //metodo para registrar una peticion de transferencia
    registrarPeticionTransferencia(transferencia: Transferencia){
        const transfer = new TransferenciaEntity();
        transfer.idUsuarioRealiza = transferencia.idRealiza;
        transfer.idUsuarioEspera = transferencia.idEspera;
        transfer.idMedicamento1 = transferencia.idMed1;
        transfer.idMedicamento2 = transferencia.idMed2;
        transfer.estadoPeticion = transferencia.est;

        this.transferenciaRepository.save(transfer);
        console.log(transfer)
    }


}

export class Transferencia {
    constructor(
        public idRealiza:number,
        public idEspera:number,
        public idMed1:number,
        public idMed2:number,
        public est:string,
    ){};
}