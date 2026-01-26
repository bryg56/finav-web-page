// import React from 'react'

import { Link, NavLink, Outlet, useNavigate } from "react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { toast } from "sonner";

export const FinavLayout = () => {
  const { user, authStatus, logout } = useContext(UserContext);

  const navigation = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success("Sesión cerrada con exito", {
      position: "top-center",
    });

    navigation("/");
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <header className="w-full p-2.5 bg-white flex ">
          <div className="mx-auto flex w-full justify-between">
            <div className="">
              <Link to="/">
                {" "}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FICONO-LOGO.png?alt=media&token=b31dcceb-6c5a-453c-b5a6-03f11184782e"
                  className="h-20"
                />
              </Link>
            </div>
            <div className="flex pr-px ">
              <NavigationMenu>
                <NavigationMenuList className="gap-8">
                  <NavigationMenuItem>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        cn(
                          "bg-transparent p-0 text-sm font-semibold",
                          "hover:bg-transparent focus:bg-transparent",

                          // 👇 CLAVE
                          isActive
                            ? "text-purple-900! border-b-2 border-yellow-400"
                            : "text-purple-900! hover:text-pink-500!",
                        )
                      }
                    >
                      INICIO
                    </NavLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavLink
                      to="/informacion"
                      className={({ isActive }) =>
                        cn(
                          "bg-transparent p-0 text-sm font-semibold",
                          "hover:bg-transparent focus:bg-transparent",

                          // 👇 CLAVE
                          isActive
                            ? "text-purple-900! border-b-2 border-yellow-400"
                            : "text-purple-900! hover:text-pink-500!",
                        )
                      }
                    >
                      ¿QUIENES SOMOS?
                    </NavLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavLink
                      to="/convocatorias"
                      className={({ isActive }) =>
                        cn(
                          "bg-transparent p-0 text-sm font-semibold",
                          "hover:bg-transparent focus:bg-transparent",

                          // 👇 CLAVE
                          isActive
                            ? "text-purple-900! border-b-2 border-yellow-400"
                            : "text-purple-900! hover:text-pink-500!",
                        )
                      }
                    >
                      CONVOCATORIAS
                    </NavLink>
                  </NavigationMenuItem>

                  {authStatus === "aunthenticated" && user ? (
                    <>
                      <span className="font-medium text-purple-700">
                        Hola {user.name}
                      </span>

                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="rounded-full! text-sm! border-pink-600! text-pink-600! hover:bg-pink-100"
                      >
                        Cerrar sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <NavigationMenuItem>
                        <NavLink to="/login">
                          <Button
                            variant="outline"
                            className="rounded-full! text-sm! border-yellow-400! text-yellow-500! hover:bg-yellow-100!"
                          >
                            Iniciar sesión
                          </Button>
                        </NavLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavLink to="/registro">
                          <Button
                            variant="outline"
                            className="rounded-full! text-sm! border-pink-600! text-pink-600! hover:bg-pink-100"
                          >
                            Regístrate
                          </Button>
                        </NavLink>
                      </NavigationMenuItem>
                    </>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>
        <main className="flex grow justify-center items-center">
          <Outlet />
        </main>
        <footer className="bg-white border-t left-0 w-full">
          <div className="w-full p-3 grid grid-cols-2  text-sm text-purple-900 justify-between">
            <div className=" grid grid-cols-2 ">
              <div className="flex ">
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FICONO-LOGO.png?alt=media&token=b31dcceb-6c5a-453c-b5a6-03f11184782e"
                    className="h-20"
                  />
                </div>
                <div>
                  <p className="font-bold mb-2">NUESTROS SITIOS</p>
                  <p>@Animagsion</p>
                  <p>@Finavmx</p>
                </div>
              </div>

              <div>
                <p className="flex justify-center font-bold mb-2">
                  NUESTRAS REDES
                </p>
                <div className="flex justify-center gap-2">
                  <Facebook />
                  <Instagram />
                </div>
              </div>
            </div>

            <div className="text-right">
              <Link className="font-bold mb-2" to={"/legal"}>
                TERMINOS Y CONDICIONES
              </Link>
              <p className="font-bold mb-2">
                CONTÁCTANOS EN: animagsion@gmail.com
              </p>
              {/* <p className="font-semibold">animagsion@gmail.com</p> */}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
