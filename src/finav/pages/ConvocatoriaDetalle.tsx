import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Convocatoria } from "@/interfaces/convocatoria.interface";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getConvocatoria } from "../actions/getConvocatoria.action";

export const ConvocatoriaDetalle = () => {
  const [convocatoria, setConvocatoria] = useState<Convocatoria>();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConvocatorias = async () => {
      const getData = await getConvocatoria(id);
      if (getData === undefined || !getData.activo) {
        navigate("/convocatorias");
      }
      setConvocatoria(getData);
    };

    fetchConvocatorias();
  }, [id, navigate]);

  return (
    <div>
      <div className="flex justify-center m-2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FCONVOCATORIAS2026.png?alt=media&token=8936983d-32e4-4665-b310-6ac62b5911df"
          alt=""
          className=""
        />
      </div>

      <Card className="relative overflow-visible max-w-4xl mx-auto rounded-2xl shadow-xl grow">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple-900">
            {convocatoria?.nombre}
          </CardTitle>
          <CardDescription className=" flex items-center! justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FLINEALARGACONVOCATORIA.png?alt=media&token=b327eb82-c912-4265-b01c-582204fc6f2b"
              alt=""
              className="items-center! h-full"
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed ">
          <div
            className="prose prose-purple max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                convocatoria?.descripcionDetalle === undefined
                  ? ""
                  : convocatoria.descripcionDetalle,
            }}
          />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <CardFooter className="flex justify-center gap-4">
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-30">
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full! text-sm! border-purple-600! bg-purple-600 text-white! hover:bg-purple-300 "
              >
                DESCARGA LAS BASES
              </Button>

              {/* Funcionalidad futura */}

              {/* <Button className="px-6 py-3 rounded-full! text-sm! border-purple-600! bg-purple-600 text-white! hover:bg-purple-300">
                INSCRIBIRME
              </Button> */}
            </div>
          </CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
};
