import { finavApi } from "@/api/finav.api";

interface CrearOrdenInput {
  tokenId: string;
  email: string;
  reservaId: string;
}

export const crearOrden = async (data: CrearOrdenInput) => {
  const res = await finavApi.post("/boletos/crear-orden", data);
  console.log(res.data);
  return res.data.payload;
};
