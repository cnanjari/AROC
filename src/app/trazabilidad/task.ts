export interface Task {
  id: string;
  proceso: string;
  fecha_inicio: string;
  feha_fin: string;
  porcentaje: number;
  cantidad_doc: number;
  estado: number;// 1: en ejecucion, 2 terminado sin errores, 3 : terminado on errores
  cerror: number;
}