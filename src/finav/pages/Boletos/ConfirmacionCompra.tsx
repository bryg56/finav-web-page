import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { obtenerOrden } from "../../actions/obtenerOrden.action";
import { toast } from "sonner";
import type { Orden } from "@/interfaces/orden.interface";

export const ConfirmacionCompra = () => {
  const [searchParams] = useSearchParams();
  const ordenId = searchParams.get("ordenId");

  const [orden, setOrden] = useState<Orden | null>(null);
  const [status, setStatus] = useState<Orden["status"]>("pendiente");

  useEffect(() => {
    if (!ordenId) return;

    let intentos = 0;
    const MAX_INTENTOS = 15; // ~45 segundos (3s * 15)

    const interval = setInterval(async () => {
      try {
        intentos++;

        const res = await obtenerOrden(ordenId);

        if (!res.ok) return;

        const { status } = res.payload;

        setStatus(status);
        setOrden(res.payload);

        // 🔥 detener polling en estados finales
        if (status === "pagado" || status === "cancelado") {
          clearInterval(interval);

          if (status === "pagado") {
            toast.success("Pago confirmado 🎉");
          }

          if (status === "cancelado") {
            toast.error("Pago rechazado ❌");
          }
        }

        // 🛑 cortar polling si se pasa el tiempo
        if (intentos >= MAX_INTENTOS) {
          clearInterval(interval);
          toast("Sigue procesando... revisa más tarde");
        }
      } catch {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [ordenId]);

  return (
    <div className="flex-row justify-center p-3">
      <div className="w-full flex justify-center mb-8">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FLOGO_FECHA.png?alt=media&token=1520ce0c-6f09-4ef6-82dd-1dade5b84fc8"
          className="max-w-lg w-full"
        />
      </div>
      <div className="bg-white shadow-xl items-center rounded-2xl p-8 w-full max-w-md text-center">
        {/* 🔄 PENDIENTE */}
        {status === "pendiente" && (
          <>
            <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold">Procesando pago...</h1>
            <p className="text-gray-500 mt-2">
              Estamos confirmando tu compra, espera unos segundos.
            </p>
          </>
        )}

        {/* ✅ PAGADO */}
        {status === "pagado" && (
          <>
            <h1 className="text-2xl font-bold text-green-500">
              🎉 ¡Compra exitosa!
            </h1>

            <p className="text-gray-600 mt-2">
              Tu pago fue procesado correctamente.
            </p>

            {/* Resumen */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg text-left space-y-2">
              <p>
                <span className="font-semibold">Orden:</span> {orden?.id}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ${orden?.total}{" "}
                MXN
              </p>
              <p>
                Si llegas a necesitar ayuda relacionada con tus boletos, por
                favor manda correo a soporte@finav.com y el numero de tu orden.
              </p>
            </div>

            {/* Info */}
            <div className="mt-4 bg-indigo-50 text-purple-700 p-3 rounded-lg text-sm">
              📩 Tus boletos serán enviados a <br />
              <span className="font-semibold">{orden?.email}</span>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg  space-y-2">
              <div>Mantente atento a como podras canjear tu boleto</div>
            </div>
          </>
        )}

        {/* ❌ RECHAZADO */}
        {status === "cancelado" && (
          <>
            <h1 className="text-2xl font-bold text-red-500">
              ❌ Pago rechazado
            </h1>

            <p className="text-gray-600 mt-2">
              Tu pago no fue aprobado, por favor ponte en contacto con el banco.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
