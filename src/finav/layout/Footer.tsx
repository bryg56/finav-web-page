import { Link } from "react-router";

import { Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <div>
      <footer className="bg-white border-t left-0 w-full">
        <div className="w-full p-3 grid grid-cols-1 md:grid-cols-2 text-sm text-purple-900 justify-between gap-6 md:gap-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3">
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FICONO-LOGO.png?alt=media&token=b31dcceb-6c5a-453c-b5a6-03f11184782e"
                  className="h-14 md:h-20"
                />
              </div>
              <div>
                <p className="font-bold mb-2">NUESTROS SITIOS</p>
                <p>@Animagsion</p>
                <p>@Finavmx</p>
              </div>
            </div>

            <div className="text-center md:text-center">
              <p className="flex justify-center font-bold mb-2">
                NUESTRAS REDES
              </p>
              <div className="flex justify-center gap-2">
                <Link rel="stylesheet" to={"https://www.facebook.com/finavmx/"}>
                  <Facebook size={18} />
                </Link>
                <Link
                  rel="stylesheet"
                  to={"https://www.instagram.com/finavmx/"}
                >
                  <Instagram size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right! mt-4 md:mt-0">
            <Link className="font-bold mb-2 block" to={"/legal"}>
              TERMINOS Y CONDICIONES
            </Link>
            <p className="font-bold mb-2">
              CONTÁCTANOS EN: animagsion@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
