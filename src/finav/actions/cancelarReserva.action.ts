import { finavApi } from "@/api/finav.api";

export const cancelarReserva = async (reservaId: string) => {
  const res = await finavApi.patch(`/boletos/cancelar-reserva/${reservaId}`);
  return res.data;
};
