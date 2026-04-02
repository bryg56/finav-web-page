import { finavApi } from "@/api/finav.api";

interface CrearOrdenInput {
  email: string;
  reservaId: string;
  nombre: string;
}

export const crearOrden = async (data: CrearOrdenInput) => {
  try {
    const res = await finavApi.post("/boletos/crear-orden", data);
    console.log(res.data);
    return res.data.payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const mensaje = error.response?.data?.message || "Error creando reserva";
    throw new Error(mensaje);
  }
};
