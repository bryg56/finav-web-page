import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "../finav/pages/Home/Home";
import { Informacion } from "../finav/pages/Informacion/Informacion";
import { Convocatorias } from "../finav/pages/Convocatoria/Convocatorias";
import { LoginPage } from "@/auth/pages/LoginPage";
import { FinavLayout } from "@/finav/layout/FinavLayout";
import { ConvocatoriaDetalle } from "@/finav/pages/Convocatoria/ConvocatoriaDetalle";
import { Registro } from "@/finav/pages/Registro/Registro";
import TermsAndConditions from "@/finav/pages/Legal/TermsAndConditions";
import { Boletos } from "@/finav/pages/Boletos/Boletos";
import { ComprarBoleto } from "@/finav/pages/Boletos/ComprarBoleto";
import { ConfirmacionCompra } from "@/finav/pages/Boletos/ConfirmacionCompra";
import PrivacyAndRefundPolicy from "@/finav/pages/Legal/PrivacyAndRefundPolicy";

export const finavRouter = createBrowserRouter([
  {
    path: "/",
    element: <FinavLayout></FinavLayout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/informacion", element: <Informacion></Informacion> },
      { path: "/convocatorias", element: <Convocatorias></Convocatorias> },
      {
        path: "/convocatorias/:id",
        element: <ConvocatoriaDetalle></ConvocatoriaDetalle>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/registro",
        element: <Registro></Registro>,
      },
      {
        path: "/legal",
        element: <TermsAndConditions></TermsAndConditions>,
      },
      {
        path: "/privacidad",
        element: <PrivacyAndRefundPolicy></PrivacyAndRefundPolicy>,
      },
      {
        path: "/boletos",
        element: <Boletos></Boletos>,
      },
      {
        path: "/boletos/:id",
        element: <ComprarBoleto></ComprarBoleto>,
      },
      {
        path: "/confirmacion",
        element: <ConfirmacionCompra></ConfirmacionCompra>,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/"></Navigate>,
  },
]);
