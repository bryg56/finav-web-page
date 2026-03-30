import { finavApi } from "@/api/finav.api";

interface ReservaInput {
  boletos: {
    boletoId: string;
    cantidad: number;
  }[];
  talleres: { tallerId: string }[];
}

interface ReservaResponse {
  reservaId: string;
  expiraEn: number;
}

export const crearReserva = async (
  data: ReservaInput,
): Promise<ReservaResponse> => {
  try {
    const res = await finavApi.post("/boletos/crear-reserva", data);
    return res.data.payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const mensaje = error.response?.data?.msg || "Error creando reserva";
    throw new Error(mensaje);
  }
};
