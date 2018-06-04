import {Component} from "@nestjs/common";

@Component()
export class MedicamentoService {

    //Metodo Crear Medicamento
    medicamentos: Medicamento[] = [];
    crearMedicamento(medicamento: Medicamento): Medicamento[]{
        this.medicamentos.push(medicamento);
        return this.medicamentos;
    }

    //Metodo Listar Todos los medicamentos
    listarMedicamento(){
        return this.medicamentos;
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
        medicamentoActualizado.pacienteId = pacienteId;

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
        public pacienteId:number,
    ){};
}