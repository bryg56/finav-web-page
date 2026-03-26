import "./HomeStyle.css";

export const Home = () => {
  return (
    <div className="w-full">
      {/* DESKTOP */}
      <div className="hidden md:block video-container">
        <video autoPlay loop muted className="background-video">
          <source
            src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2Fvideo_promocional.mp4?alt=media&token=56e302c6-85c5-42cc-8579-829c2fd5c936"
            type="video/mp4"
          />
        </video>

        <div className="overlay-content">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FTEXTOS_LOGOINICIO.png?alt=media&token=958e6a3a-9092-43a2-bd73-9a5a14c3cb77"
            alt="Logo"
            className="overlay-png"
          />
        </div>
      </div>
    </div>
  );
};
