import { finavApi } from "@/api/finav.api";
import type { Boleto } from "@/interfaces/boleto.interface";

export const getBoletos = async (): Promise<Boleto[]> => {
  const res = await finavApi.get("/boletos/obtener");

  return res.data.payload.map((boleto: Boleto) => ({
    _id: boleto._id,
    nombre: boleto.nombre,
    descripcionCorta: boleto.descripcionCorta,
    descripcion: boleto.descripcion,
    slug: boleto.slug,
    activo: boleto.activo,
    costo: boleto.costo,
    fechaAlta: boleto.fechaAlta,
    __v: boleto.__v,
    vendidos: boleto.vendidos,
  }));
};
