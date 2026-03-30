export interface ResponseBoletos {
  ok: boolean;
  msg: string;
  payload: Boleto[];
}

export interface Boleto {
  _id: string;
  nombre: string;
  tipoBoletoId: string;
  descripcion: string;
  costo: number;
  activo: boolean;
  fechaAlta: Date;
  __v: number;
  cantidad: number;
  slug: string;
  descripcionCorta: string;
  vendidos: number;
  limitePorCompra: number;
  beneficios: {
    talleresIncluidos: number;
  };
}
