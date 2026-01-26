import { finavApi } from "@/api/finav.api";
import type { User } from "@/interfaces/user.interface";

export const loginUsuario = async (data: unknown): Promise<User> => {
  try {
    const res = await finavApi.post("/auth/", data);

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      ok: false,
      id: "",
      name: "",
      token: "",
    };
  }
};
