import { finavApi } from "@/api/finav.api";
import type { ResponseUser } from "@/interfaces/userCreated.interface";

export const crearUsuario = async (data: unknown): Promise<ResponseUser> => {
  try {
    const res = await finavApi.post("/auth/new", data);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      ok: false,
      message: "res",
      id: "",
      name: "",
      token: "",
    };
  }
};
