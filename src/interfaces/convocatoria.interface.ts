export interface ResponseConvocatoria {
  ok: boolean;
  msg: string;
  payload: Convocatoria[];
}

export interface Convocatoria {
  _id: string;
  nombre: string;
  descripcionCorta: string;
  descripcionDetalle: string;
  fechaInicio: Date;
  boletoId: string;
  activo: boolean;
  slug: string;
  __v: number;
  porAnunciar: boolean;
  documentoUrl: string;
}
