import { finavApi } from "@/api/finav.api";
import type {
  Convocatoria,
  // ResponseConvocatoria,
} from "@/interfaces/convocatoria.interface";

export const getConvocatoria = async (
  slug: string | undefined,
): Promise<Convocatoria> => {
  const res = await finavApi.get("/convocatorias/obtener", {
    params: {
      id: slug,
    },
  });

  return res.data.payload[0];
};
