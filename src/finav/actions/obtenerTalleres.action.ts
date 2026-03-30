import { finavApi } from "@/api/finav.api";
import type { Taller } from "@/interfaces/taller.interface";

export const obtenerTalleres = async (
  slug: string | undefined,
): Promise<Taller[]> => {
  const res = await finavApi.get("/boletos/talleres", {
    params: {
      id: slug,
    },
  });

  return res.data.payload.map((taller: Taller) => ({
    _id: taller._id,
    nombre: taller.nombre,
    capacidad: taller.capacidad,
    reservados: taller.reservados,
    ocupados: taller.ocupados,
    disponibles: taller.disponibles,
  }));
};
