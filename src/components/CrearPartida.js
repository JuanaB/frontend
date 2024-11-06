import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCrearPartida } from "./apiService";
import "../styles/CrearPartida.css";

function CrearPartida() {
  const navigate = useNavigate();
  const [nombrePartida, setNombrePartida] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  // Saco de la url mi idJugador
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idJugador = queryParams.get("idJugador") || null;

  const handleCrearPartida = async (e) => {
    e.preventDefault();

    const response = await apiCrearPartida(nombrePartida, idJugador);
    if (response.success) {
      setMensajeRespuesta(
        "Partida creada exitosamente, redirigiendo al lobby..."
      );
      setTimeout(() => {
        navigate(
          `/lobby?idJugador=${idJugador}&idPartida=${response.partidaId}`
        );
      }, 2000);
    } else {
      setMensajeRespuesta("Error al crear la partida");
      if (response.error != null) {
        console.log(response.error);
      }
    }
  };

  return (
    <div className="container_crear_partida">
      <h2 className="title_crear_partida">Crear una partida</h2>
      <form onSubmit={handleCrearPartida} className="form_crear_partida">
        <label htmlFor="nombrePartida" className="form-label">
          Nombre de la partida:
        </label>
        <input
          type="text"
          className="form-control"
          id="nombrePartida"
          data-testid="nombrePartida"
          placeholder="Insertar nombre de la partida"
          value={nombrePartida}
          onChange={(e) => setNombrePartida(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Crear Partida
        </button>
      </form>
      {mensajeRespuesta && <p className="mt-3">{mensajeRespuesta}</p>}
    </div>
  );
}

export default CrearPartida;
