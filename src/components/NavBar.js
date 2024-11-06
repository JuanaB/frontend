import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

function Navbar() {
  // Saco de la url mi idJugador
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idJugador = queryParams.get("idJugador");

  return (
    <>
      <div className="container_nav">
      <h1 className="la_cosa">La Cosa</h1>
      <div className="botones_contenedor">
        <div className="item1">
          <Link to={`crear?idJugador=${idJugador}`} className="nav-link">
            <button className="item">Crear Partida</button>
          </Link>
        </div>
        <div className="item2">
          <Link to={`unir?idJugador=${idJugador}`} className="nav-link">
            <button className="item">Unirse a Partida</button>
          </Link>
        </div>
        </div>
        <div></div>
        <div className="alien_img"></div>
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
