import { finavApi } from "@/api/finav.api";
import type { User } from "@/interfaces/user.interface";

export const validateToken = async (data: unknown): Promise<User> => {
  try {
    const res = await finavApi.post("/auth/renew", {
      Headers: {
        token: data,
      },
    });

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
