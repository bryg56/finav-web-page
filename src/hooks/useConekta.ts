import { useEffect } from "react";

const PUBLIC_KEY = "key_LG8Ppq7fSSZlayM4Y2TCRRN";

export const useConekta = () => {
  useEffect(() => {
    if (window.Conekta) {
      window.Conekta.setPublicKey(PUBLIC_KEY);
    }
  }, []);
};
