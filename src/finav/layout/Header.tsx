import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/userContext";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { user, authStatus, logout } = useContext(UserContext);
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada con exito", {
      position: "top-center",
    });
    navigation("/");
    setIsOpen(false);
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-semibold transition-colors",
      isActive
        ? "text-purple-900 border-b-2 border-yellow-400"
        : "text-purple-900 hover:text-pink-500",
    );

  return (
    <header className="w-full bg-white shadow-sm relative">
      <div className="mx-auto flex w-full items-center justify-between p-3">
        {/* LOGO */}
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FICONO-LOGO.png?alt=media&token=b31dcceb-6c5a-453c-b5a6-03f11184782e"
            className="h-16 md:h-20"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-8 items-center">
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
                  to="/boletos"
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
                  BOLETOS
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-purple-900"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-4 flex flex-col gap-4">
          <NavLink
            to="/"
            className={navLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            INICIO
          </NavLink>

          <NavLink
            to="/informacion"
            className={navLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            ¿QUIENES SOMOS?
          </NavLink>

          <NavLink
            to="/boletos"
            className={navLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            BOLETOS
          </NavLink>

          <NavLink
            to="/convocatorias"
            className={navLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            CONVOCATORIAS
          </NavLink>

          {authStatus === "aunthenticated" && user ? (
            <>
              <span className="font-medium text-purple-700">
                Hola {user.name}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full text-sm border-pink-600 text-pink-600 hover:bg-pink-100"
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full rounded-full text-sm border-yellow-400 text-yellow-500 hover:bg-yellow-100"
                >
                  Iniciar sesión
                </Button>
              </NavLink>

              <NavLink to="/registro" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full rounded-full text-sm border-pink-600 text-pink-600 hover:bg-pink-100"
                >
                  Regístrate
                </Button>
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};
