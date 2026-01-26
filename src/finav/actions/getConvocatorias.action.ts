import { finavApi } from "@/api/finav.api";
import type {
  Convocatoria,
  // ResponseConvocatoria,
} from "@/interfaces/convocatoria.interface";

export const getConvocatorias = async (): Promise<Convocatoria[]> => {
  const res = await finavApi.get("/convocatorias/obtener");

  return res.data.payload.map((convocatoria: Convocatoria) => ({
    _id: convocatoria._id,
    nombre: convocatoria.nombre,
    descripcionCorta: convocatoria.descripcionCorta,
    descripcionDetalle: convocatoria.descripcionDetalle,
    slug: convocatoria.slug,
    activo: convocatoria.activo,
    boletoId: convocatoria.boletoId,
    fechaInicio: convocatoria.fechaInicio,
    __v: convocatoria.__v,
    porAnunciar: convocatoria.porAnunciar,
    documentoUrl: convocatoria.documentoUrl,
  }));
};
