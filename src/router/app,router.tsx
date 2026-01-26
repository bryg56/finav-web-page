import { createBrowserRouter, Navigate } from "react-router";
import { Home } from "../finav/pages/Home";
import { Informacion } from "../finav/pages/Informacion";
import { Convocatorias } from "../finav/pages/Convocatorias";
import { LoginPage } from "@/auth/pages/LoginPage";
import { FinavLayout } from "@/finav/layout/FinavLayout";
import { ConvocatoriaDetalle } from "@/finav/pages/ConvocatoriaDetalle";
import { Registro } from "@/finav/pages/Registro";
import TermsAndConditions from "@/finav/pages/TermsAndConditions";

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
    ],
  },

  {
    path: "*",
    element: <Navigate to="/"></Navigate>,
  },
]);
