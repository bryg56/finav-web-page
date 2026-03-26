import { finavApi } from "@/api/finav.api";
import type { Orden } from "@/interfaces/orden.interface";

export interface ObtenerOrdenResponse {
  ok: boolean;
  payload: Orden;
}

export const obtenerOrden = async (
  ordenId: string,
): Promise<ObtenerOrdenResponse> => {
  const resp = await finavApi.get(`/boletos/orden/${ordenId}`);
  return resp.data;
};
