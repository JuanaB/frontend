import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCrearJugador } from "./apiService";
import "../styles/CrearJugador.css";
import CustomButton from "./CustomButton";

function CrearJugador() {
  const navigate = useNavigate();

  const [nombreJugador, setNombreJugador] = useState("");
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");

  const handleCrearJugador = async () => {
    const response = await apiCrearJugador(nombreJugador);
    if (response.success) {
      setMensajeRespuesta(
        "Jugador creado exitosamente, redirigiendo al inicio ..."
      );
      setTimeout(() => {
        navigate(`/home/crear?idJugador=${response.playerId}`);
      }, 1000);
    } else {
      setMensajeRespuesta(response.message);

      // Si pasa algo que me lo muestre en consola
      if (response.error != null) {
        console.log(response.error);
      }
    }
  };
  return (
    <div className="container_principal">
      <div class="background-image"></div>
      <h1 className="welcome">¡Bienvenidos al juego La Cosa!</h1>

      <h4 className="subtitulos">Para comenzar a jugar:</h4>
      <input
        type="text"
        data-testid="nombreJugadorInput"
        placeholder="Insertar nombre"
        value={nombreJugador}
        onChange={(e) => setNombreJugador(e.target.value)}
        className="form-control"
      />
      <br />
      <button
        data-testid="buttonJugador"
        onClick={() => handleCrearJugador()}
        className="button"
      >
        Crear Jugador
      </button>

      {mensajeRespuesta && (
        <p className="mt-3 alert alert-info">{mensajeRespuesta}</p>
      )}
    </div>
  );
}
export default CrearJugador;
