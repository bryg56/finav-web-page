import { finavApi } from "@/api/finav.api";
import type { Boleto } from "@/interfaces/boleto.interface";

export const getBoleto = async (slug: string | undefined): Promise<Boleto> => {
  const res = await finavApi.get("/boletos/obtener", {
    params: {
      id: slug,
    },
  });

  return res.data.payload[0];
};
