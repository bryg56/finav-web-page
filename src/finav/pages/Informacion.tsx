export const Informacion = () => {
  return (
    <div className="flex justify-center items-center w-full ml-60 mr-60">
      {/* Titulo o imagen  */}
      <div className="w-full ">
        <div className="m-4 flex justify-center items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FQUIENES_SOMOSTEXT.png?alt=media&token=84c495e6-4b82-4659-9376-f182bb0f7c43"
            alt=""
          />
        </div>

        <div className=" flex justify-center w-full">
          <img
            className="w-full"
            src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FFOTO_NOSOTROS.png?alt=media&token=168b0195-150e-47d0-bb99-9c72efd16753"
            alt=""
          />
        </div>

        <div className="mt-3 mb-3 flex justify-center text-center text-shadow-md">
          AnimAGSión está conformado por un grupo de artistas hidrocalidos
          apasionados y comprometidos con impulsar, compartir y crecer el arte
          local y nacional. Desde 2022 nos hemos dedicado a crear diferentes
          actividades y dinámicas para compartir nuestra pasión por las artes
          visuales haciendo crecer a la comunidad artistica buscando
          consolidarla un artista a la vez, acercando a los jóvenes y nuevos
          talentos la oportunidad de encontrar un refugio y oportunidad en las
          artes. FINAV es nuestra propuesta más reciente donde nuestro objetivo
          es dar el siguiente paso para seguir consolidando y compartiendo a
          incluso más personas este maravilloso mundo de la animación, novela
          gráfica y videojuegos.
        </div>

        <div className="grid grid-cols-3 mb-3 ">
          <div className="flex justify-center items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2Fbazaropolis_icon.PNG?alt=media&token=6f788edd-a12d-4e5f-81ef-03e47296272f"
              alt=""
              className="size-3/4"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FvectorANIMAGSIONcolor.png?alt=media&token=68028883-67c7-4481-8813-be57eab11265"
              alt=""
              className="size-3/4"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FvectorDRINKNDRAW.png?alt=media&token=ef05922b-98e2-4bc0-9ce8-51d98e778ff5"
              alt=""
              className="size-3/4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
