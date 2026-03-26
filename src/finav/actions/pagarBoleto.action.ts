interface PagarBoletoPayload {
  tokenId: string;
  email: string;
  cuponCodigo?: string;
  reservaId: string;
}

export const pagarBoleto = async (payload: PagarBoletoPayload) => {
  const res = await fetch("http://localhost:4000/api/boletos/crear-orden", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al pagar");
  }

  return data;
};
