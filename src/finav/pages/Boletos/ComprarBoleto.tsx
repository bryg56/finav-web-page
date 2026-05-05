/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import type { Boleto } from "@/interfaces/boleto.interface";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getBoleto } from "../../actions/getBoleto.action";
import { crearOrden } from "../../actions/crearOrden.action";
import { useConekta } from "@/hooks/useConekta";
import { toast } from "sonner";
import { useForm, type SubmitHandler } from "react-hook-form";
import { crearReserva } from "../../actions/crearReserva.action";
// import { useRef } from "react";
import { cancelarReserva } from "../../actions/cancelarReserva.action";
import { obtenerTalleres } from "../../actions/obtenerTalleres.action";
import type { Taller } from "@/interfaces/taller.interface";

type Inputs = {
  email: string;
  confirmEmail: string; // 👈 nuevo
  cupon: string;
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  name: string;
};

export const ComprarBoleto = () => {
  useConekta();

  // const expMonthRef = useRef<HTMLInputElement>(null);
  // const expYearRef = useRef<HTMLInputElement>(null);
  // const cvcRef = useRef<HTMLInputElement>(null);

  const [boleto, setBoleto] = useState<Boleto>();
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);

  // const [cardNumber, setCardNumber] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [cardType, setCardType] = useState("");
  // const [cardError, setCardError] = useState("");
  const [reservaId, setReservaId] = useState<string | null>(null);
  const [reservaActiva, setReservaActiva] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [talleresSeleccionados, setTalleresSeleccionados] = useState<any[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    // setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange", // 👈 clave para validar en tiempo real
  });

  const emailValue = watch("email");

  const precioUnitario = boleto?.costo ?? 0;
  const subtotal = precioUnitario * cantidad;
  const total = subtotal;

  const talleresPermitidos =
    (boleto?.beneficios?.talleresIncluidos || 0) * cantidad;

  const puedeElegirTalleres = talleresPermitidos > 0;

  useEffect(() => {
    const fetchBoleto = async () => {
      const getData = await getBoleto(id);

      if (!getData || !getData.activo) {
        navigate("/boletos");
        return;
      }

      setBoleto(getData);
    };

    fetchBoleto();
  }, [id, navigate]);

  useEffect(() => {
    const fetchTalleres = async () => {
      if (!boleto?.slug) return;

      try {
        const data = await obtenerTalleres(boleto.slug);
        setTalleres(data);
      } catch (error: any) {
        toast(error.message);
      }
    };

    if (puedeElegirTalleres) {
      fetchTalleres();
    } else {
      setTalleres([]);
      setTalleresSeleccionados([]);
    }
  }, [puedeElegirTalleres, boleto?.slug]);

  useEffect(() => {
    const storedReserva = localStorage.getItem("reservaId");
    const storedTiempo = localStorage.getItem("reservaTiempo");
    if (storedReserva && storedTiempo) {
      setReservaId(storedReserva);
      setReservaActiva(true);
      setTiempoRestante(parseInt(storedTiempo));
    }
  }, []);

  // contador
  useEffect(() => {
    if (!reservaActiva) return;

    const interval = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          localStorage.removeItem("reservaId");
          localStorage.removeItem("reservaTiempo");
          setReservaActiva(false);
          toast.warning("La reserva expiró", {
            position: "top-center",
          });
          return 0;
        }

        const nuevo = prev - 1;
        localStorage.setItem("reservaTiempo", nuevo.toString());

        return nuevo;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reservaActiva]);

  const reservarBoletos = async () => {
    if (!boleto) return;

    if (talleresSeleccionados.length > talleresPermitidos) {
      toast("Seleccionaste más talleres de los permitidos");
      return;
    }

    try {
      const res = await crearReserva({
        boletos: [
          {
            boletoId: boleto._id,
            cantidad,
          },
        ],
        talleres: talleresSeleccionados.map((id) => ({
          tallerId: id,
        })),
      });

      setReservaId(res.reservaId);
      setReservaActiva(true);
      setTiempoRestante(res.expiraEn);

      localStorage.setItem("reservaId", res.reservaId);
      localStorage.setItem("reservaTiempo", res.expiraEn.toString());
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const pagar: SubmitHandler<Inputs> = async (data) => {
    if (!boleto || !reservaId) {
      toast("Primero debes reservar boletos", {
        position: "top-center",
      });
      return;
    }

    if (cantidad > (boleto?.limitePorCompra ?? 1)) {
      toast("Has excedido el límite de compra permitido", {
        position: "top-center",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await crearOrden({
        email: data.email,
        reservaId,
        nombre: data.name,
      });

      if (res.paymentUrl) {
        // limpiar estado
        setReservaId(null);
        setReservaActiva(false);
        setTiempoRestante(0);

        localStorage.removeItem("reservaId");
        localStorage.removeItem("reservaTiempo");
        window.location.href = res.paymentUrl;
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  // const { ref: expMonthRegisterRef, ...expMonthRest } = register("exp_month", {
  //   required: "Mes requerido",
  //   validate: (value) => {
  //     const num = parseInt(value);
  //     if (isNaN(num) || num < 1 || num > 12) return "Mes inválido";
  //     return true;
  //   },
  // });

  // const { ref: expYearRegisterRef, ...expYearRest } = register("exp_year", {
  //   required: "Año requerido",
  //   pattern: {
  //     value: /^\d{2}$/,
  //     message: "Año inválido",
  //   },
  // });

  // const { ref: cvcRegisterRef, ...cvcRest } = register("cvc", {
  //   required: "CVC requerido",
  //   pattern: {
  //     value: /^\d{3,4}$/,
  //     message: "CVC inválido",
  //   },
  // });

  const handleCancelarReserva = async () => {
    if (!reservaId) return;

    const confirmar = confirm("¿Seguro que quieres cancelar tu reserva?");
    if (!confirmar) return;

    try {
      await cancelarReserva(reservaId);

      // limpiar estado
      setReservaId(null);
      setReservaActiva(false);
      setTiempoRestante(0);

      localStorage.removeItem("reservaId");
      localStorage.removeItem("reservaTiempo");

      toast("Reserva cancelada");
    } catch (error: any) {
      toast(error.message || "Error al cancelar reserva");
      setReservaId(null);
      setReservaActiva(false);
      setTiempoRestante(0);

      localStorage.removeItem("reservaId");
      localStorage.removeItem("reservaTiempo");
    }
  };

  const formInvalido = !isValid || !reservaActiva || !reservaId;

  return (
    <div>
      <div className="w-full flex justify-center mb-8">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FLOGO_FECHA.png?alt=media&token=1520ce0c-6f09-4ef6-82dd-1dade5b84fc8"
          className="max-w-lg w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-start">
        <div className="max-w-lg w-full">
          <Card className="relative overflow-visible rounded-2xl shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple-900">
                {boleto?.nombre}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FLINEALARGACONVOCATORIA.png?alt=media&token=b327eb82-c912-4265-b01c-582204fc6f2b"
                  alt=""
                  className="mx-auto"
                />
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: boleto?.descripcion ?? "",
                }}
              />

              {puedeElegirTalleres && (
                <div className="p-4 border rounded-xl bg-purple-50">
                  <h3 className=" text-purple-800! mb-2">
                    SELECCIONA TUS TALLERES
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    Puedes elegir hasta {talleresPermitidos} talleres
                  </p>

                  <div className="space-y-2">
                    {talleres.map((taller) => {
                      const seleccionado = talleresSeleccionados.some(
                        (t) => t === taller._id,
                      );

                      const lleno = taller.disponibles <= 0;

                      return (
                        <div
                          key={taller._id}
                          className={`p-3 rounded-lg border flex justify-between items-center cursor-pointer transition
                                          ${
                                            lleno
                                              ? "bg-gray-200 cursor-not-allowed"
                                              : seleccionado
                                                ? "bg-purple-200 border-purple-500"
                                                : "bg-white hover:bg-purple-100"
                                          }`}
                          onClick={() => {
                            if (lleno) return;

                            if (reservaActiva) return;

                            if (seleccionado) {
                              setTalleresSeleccionados((prev) =>
                                prev.filter((id) => id !== taller._id),
                              );
                            } else {
                              if (
                                talleresSeleccionados.length >=
                                talleresPermitidos
                              ) {
                                toast.warning(
                                  "Has alcanzado el límite de talleres",
                                  {
                                    position: "top-center",
                                  },
                                );
                                return;
                              }

                              setTalleresSeleccionados((prev) => [
                                ...prev,
                                taller._id,
                              ]);
                            }
                          }}
                        >
                          <div>
                            <p className="font-semibold text-purple-800!">
                              {taller.nombre}
                            </p>
                            <p className="text-xs text-gray-500">
                              Cupo disponible: {taller.disponibles}
                            </p>
                          </div>

                          {seleccionado && <span>✅</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center">
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                <Button
                  className="px-6 py-3 rounded-full! text-sm! border-purple-600! bg-purple-600 text-white!"
                  onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  disabled={reservaActiva!}
                >
                  -1
                </Button>

                <div className="flex items-center font-bold px-6 rounded-full! text-sm! border-orange-400! bg-orange-400 text-black!">
                  {cantidad}
                </div>

                <Button
                  className="px-6 py-3 rounded-full! text-sm! border-purple-600! bg-purple-600 text-white!"
                  onClick={() =>
                    cantidad < (boleto?.limitePorCompra ?? 4) &&
                    setCantidad(cantidad + 1)
                  }
                  disabled={reservaActiva!}
                >
                  +1
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="max-w-lg w-full">
          <Card className="rounded-2xl shadow-xl p-6 space-y-6">
            <CardTitle className="text-2xl font-bold text-purple-900">
              Resumen de compra
            </CardTitle>

            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)} MXN</span>
              </div>

              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-green-600">${total.toFixed(2)} MXN</span>
              </div>
            </div>

            {!reservaActiva && (
              <Button
                onClick={reservarBoletos}
                className=" bg-purple-600 hover:bg-purple-700 text-white rounded-full! py-3 text-lg"
              >
                Reservar boletos
              </Button>
            )}

            {reservaActiva && (
              <div className="space-y- text-center mt-1">
                <p className="text-red-500 text-sm font-medium">
                  ⏳ Tienes {Math.floor(tiempoRestante / 60)}:
                  {(tiempoRestante % 60).toString().padStart(2, "0")} para pagar
                </p>

                <Button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-full! px-5 py-1 text-sm transition-all hover:scale-105"
                  onClick={handleCancelarReserva}
                >
                  Cancelar reserva
                </Button>
              </div>
            )}

            {reservaActiva && (
              <form onSubmit={handleSubmit(pagar)} className="space-y-4 mt-1">
                <div className="pt-1">
                  <input
                    placeholder="Nombre"
                    className={`w-full border rounded-xl px-4 py-3 outline-none transition-all
                        ${
                          errors.name
                            ? "border-red-500 focus:ring-2 focus:ring-red-400"
                            : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
                        }`}
                    {...register("name", {
                      required: "Nombre requerido",
                      minLength: {
                        value: 3,
                        message: "Nombre muy corto",
                      },
                    })}
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs px-1 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className={`w-full border rounded-xl px-4 py-3 transition-all outline-none
                              ${
                                errors.email
                                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                                  : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
                              }`}
                    {...register("email", {
                      required: "El correo es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Correo inválido",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-xs px-1">
                      {errors.email.message}
                    </p>
                  )}

                  <input
                    type="email"
                    placeholder="Confirmar correo electrónico"
                    className={`w-full border rounded-xl mt-3 px-4 py-3 transition-all outline-none
                        ${
                          errors.confirmEmail
                            ? "border-red-500 focus:ring-2 focus:ring-red-400"
                            : "border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
                        }`}
                    {...register("confirmEmail", {
                      required: "Confirma tu correo",
                      validate: (value) =>
                        value === emailValue || "Los correos no coinciden",
                    })}
                  />

                  {errors.confirmEmail && (
                    <p className="text-red-500 text-xs px-1">
                      {errors.confirmEmail.message}
                    </p>
                  )}
                </div>

                {/* 🎟 CUPÓN
                <input
                  type="text"
                  placeholder="Cupón"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none 
                  focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all"
                  {...register("cupon")}
                /> */}

                <p className="text-xs text-gray-500 text-center px-2 leading-relaxed">
                  Al completar la compra, aceptas nuestro{" "}
                  <span
                    className="text-purple-600 font-semibold cursor-pointer underline"
                    onClick={() => navigate("/privacidad")}
                  >
                    Aviso de Privacidad
                  </span>{" "}
                  y la{" "}
                  <span
                    className="text-purple-600 font-semibold cursor-pointer underline"
                    onClick={() =>
                      window.open(
                        "/privacidad",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    Política de Reembolsos
                  </span>
                  , incluyendo que en caso de reembolso se aplicará una comisión
                  del 3% por procesamiento de pago.
                </p>
                <Button
                  className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full! py-3 text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || formInvalido}
                  type="submit"
                >
                  {loading ? "Procesando..." : "PAGAR"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
