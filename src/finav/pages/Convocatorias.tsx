import { CustomCard } from "@/components/custom/CustomCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getConvocatorias } from "../actions/getConvocatorias.action";
import type { Convocatoria } from "@/interfaces/convocatoria.interface";
import { LoadingCircle } from "@/components/custom/LoadingCircle";

export const Convocatorias = () => {
  const [convocatoria, setConvocatoria] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConvocatorias = async () => {
      setLoading(true);
      const getData = await getConvocatorias();
      setConvocatoria(getData);
      setLoading(false);
    };

    fetchConvocatorias();
  }, []);

  const navigation = useNavigate();

  const handleClick = (id: string) => {
    navigation(`/convocatorias/${id}`);
  };
  return (
    <div className="">
      <div className="flex justify-center py-4">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FCONVOCATORIAS2026.png?alt=media&token=8936983d-32e4-4665-b310-6ac62b5911df"
          alt=""
          className=""
        />
      </div>
      <div>
        {!loading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {convocatoria.map((convocatoria) => (
                <div className="flex justify-center">
                  <CustomCard
                    title={convocatoria.nombre}
                    id={convocatoria.slug}
                    description={convocatoria.descripcionCorta}
                    isActive={convocatoria.activo}
                    porAnunciar={convocatoria.porAnunciar}
                    buttonClicked={handleClick}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <LoadingCircle blockPage={false} />
          </>
        )}
      </div>
    </div>
  );
};
