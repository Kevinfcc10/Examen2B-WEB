export interface PacieneInterface {

  id_paciente: number,
  nombres: string,
  apellidos: string,
  fechaNacimiento:Date,
  hijos:number,
  tieneSeguro:boolean,
  img_paciente: string,
  idFk: number,
}
