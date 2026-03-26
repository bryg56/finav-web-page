export interface Orden {
  id: string;
  status: "pendiente" | "pagado" | "cancelado";
  total: number;
  cantidad: number;
  email: string;
  createdAt: string;
}
