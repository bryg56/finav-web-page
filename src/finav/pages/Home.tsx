import "./HomeStyle.css";

export const Home = () => {
  return (
    <div className="h-full w-full">
      {/* <h1> Estamos trabajando duro para traerte la primer edición de:</h1> */}
      {/* <img src={banner} alt="Descripción de la imagen" /> */}

      <div className="video-container">
        {/* Video de fondo */}
        <video autoPlay loop muted className="background-video">
          <source
            src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2Fvideo_promocional.mp4?alt=media&token=56e302c6-85c5-42cc-8579-829c2fd5c936"
            type="video/mp4"
          />
          Tu navegador no soporta la etiqueta de video.
        </video>

        {/* PNG encima del video */}
        <div className="overlay-content">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FTEXTOS_LOGOINICIO.png?alt=media&token=958e6a3a-9092-43a2-bd73-9a5a14c3cb77"
            alt="Logo"
            className="overlay-png img-desktop"
          />
        </div>
      </div>
    </div>
  );
};
