export default function PrivacyAndRefundPolicy() {
  return (
    <main className="min-h-screen flex justify-center px-4 py-16">
      <section className="bg-white max-w-4xl w-full rounded-3xl shadow-xl p-8 md:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-purple-900! tracking-tight">
            Aviso de Privacidad y Política de Reembolsos
          </h1>
          <p className="mt-3 text-gray-500">Última actualización: Enero 2026</p>
        </header>

        <article className="space-y-8 text-gray-700! leading-relaxed">
          {/* PRIVACIDAD */}
          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              1. Identidad y domicilio del responsable
            </h2>
            <p>
              FINAV (en lo sucesivo, “la Plataforma”), es responsable del
              tratamiento de los datos personales que recaba, en cumplimiento
              con la Ley Federal de Protección de Datos Personales en Posesión
              de los Particulares (LFPDPPP).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              2. Datos personales recabados
            </h2>
            <p>
              Los datos personales que podrán ser recabados incluyen nombre,
              correo electrónico y datos necesarios para procesar pagos. La
              Plataforma no almacena datos bancarios sensibles, ya que estos son
              gestionados por proveedores externos certificados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              3. Finalidades del tratamiento
            </h2>
            <p>
              Los datos personales serán utilizados para:
              <ul className="list-disc ml-6 mt-2">
                <li>Procesar compras y emitir boletos digitales</li>
                <li>Enviar confirmaciones y notificaciones</li>
                <li>Atender solicitudes de soporte</li>
                <li>Cumplir obligaciones legales aplicables</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              4. Transferencia de datos
            </h2>
            <p>
              Los datos podrán ser compartidos con proveedores de servicios de
              pago, como Conekta, exclusivamente para procesar transacciones,
              bajo estándares de seguridad adecuados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              5. Derechos ARCO
            </h2>
            <p>
              El titular podrá ejercer en cualquier momento sus derechos de
              acceso, rectificación, cancelación u oposición (ARCO), mediante
              solicitud al correo de contacto de la Plataforma.
            </p>
          </section>

          {/* REEMBOLSOS */}
          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              6. Política de reembolsos
            </h2>
            <p>
              Las compras realizadas a través de la Plataforma son finales y no
              reembolsables, salvo en los casos expresamente previstos en la
              legislación aplicable o cuando el evento sea cancelado o
              modificado de forma sustancial.
            </p>

            <p className="mt-3">
              En caso de que proceda un reembolso, el monto a devolver será el
              valor pagado por el usuario menos una comisión del{" "}
              <span className="font-semibold text-purple-700">
                3% del total de la transacción
              </span>
              , correspondiente a costos de procesamiento de pago.
            </p>

            <p className="mt-3">
              Dicha comisión es cobrada por el proveedor de pagos ( Conekta) y
              no es recuperable por la Plataforma, por lo que el usuario acepta
              expresamente esta deducción al momento de realizar la compra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              7. Procedimiento de reembolso
            </h2>
            <p>
              Para solicitar un reembolso, el usuario deberá contactar a la
              Plataforma mediante los canales oficiales. Cada solicitud será
              evaluada conforme a las condiciones aplicables.
            </p>
            <p className="mt-3">
              En caso de ser aprobado, el reembolso será procesado utilizando el
              mismo método de pago, en un plazo estimado de 5 a 15 días hábiles.
            </p>
          </section>

          {/* RESPONSABILIDAD */}
          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              8. Limitación de responsabilidad
            </h2>
            <p>
              La Plataforma no será responsable por fallas en servicios de
              terceros, incluyendo proveedores de pago, redes bancarias o
              interrupciones de internet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              9. Uso indebido
            </h2>
            <p>
              La Plataforma se reserva el derecho de cancelar transacciones o
              cuentas en caso de detectar actividad fraudulenta, uso indebido o
              violaciones a los términos establecidos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              10. Modificaciones
            </h2>
            <p>
              La Plataforma podrá modificar en cualquier momento el presente
              aviso. Las modificaciones surtirán efecto desde su publicación en
              el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-500! mb-3">
              11. Legislación y jurisdicción
            </h2>
            <p>
              Este documento se rige por las leyes aplicables en los Estados
              Unidos Mexicanos. Cualquier controversia será resuelta ante los
              tribunales competentes.
            </p>
          </section>
        </article>

        <footer className="mt-12 text-center text-sm text-gray-400">
          © 2026 FINAV
        </footer>
      </section>
    </main>
  );
}
