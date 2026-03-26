export interface ConektaToken {
  id: string;
}

export interface ConektaError {
  message: string;
}

export interface ConektaGlobal {
  setPublicKey: (key: string) => void;
  Token: {
    create: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any,
      success: (token: ConektaToken) => void,
      error: (error: ConektaError) => void,
    ) => void;
  };
}

declare global {
  interface Window {
    Conekta: ConektaGlobal;
  }
}
