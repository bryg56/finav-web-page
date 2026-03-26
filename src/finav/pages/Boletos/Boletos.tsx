import { CustomCard } from "@/components/custom/CustomCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getBoletos } from "../../actions/getBoletos.action";
import type { Boleto } from "@/interfaces/boleto.interface";
import { LoadingCircle } from "@/components/custom/LoadingCircle";

export const Boletos = () => {
  const [boleto, setBoleto] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const fetchBoletos = async () => {
      setLoading(true);
      const getData = await getBoletos();
      setBoleto(getData);
      setLoading(false);
    };

    fetchBoletos();
  }, []);

  const navigation = useNavigate();

  const handleClick = (id: string) => {
    navigation(`/boletos/${id}`);
  };
  return (
    <div className="max-w-7xl mx-auto px-6">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in">
            <h2 className="text-2xl font-extrabold text-red-600 mb-4">
              ⚠️ Aviso importante
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              La venta de boletos aún{" "}
              <span className="font-semibold">no es oficial</span>.
              <br />
              Esta funcionalidad se encuentra actualmente en{" "}
              <span className="font-semibold">fase de pruebas</span>.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FLOGO_FECHA.png?alt=media&token=1520ce0c-6f09-4ef6-82dd-1dade5b84fc8"
          alt="FINAV Logo"
          className="max-w-lg w-full"
        />
      </div>

      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {boleto.map((boleto) => (
            <div key={boleto.slug} className="flex justify-center">
              <CustomCard
                title={boleto.nombre}
                id={boleto.slug}
                description={boleto.descripcionCorta}
                isActive={boleto.activo}
                porAnunciar={false}
                buttonClicked={handleClick}
                textButton="COMPRAR"
              />
            </div>
          ))}
        </div>
      ) : (
        <LoadingCircle blockPage={false} />
      )}
    </div>
  );
};
