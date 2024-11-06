import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { apiObtenerPartidas } from "./apiService";
import "../styles/UnirseAPartida.css";

function UnirseAPartida() {
  const navigate = useNavigate();
  const [partidas, setPartidas] = useState([]);
  // Saco de la url mi idJugador
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idJugador = queryParams.get("idJugador");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiObtenerPartidas();

        if (result.success) {
          setPartidas(result.partidas);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    fetchData(); // Llama a la función fetchData inmediatamente
  }, []);

  const handleUnirseAPartida = async (partidaId) => {
    try {
      // Realizar una solicitud POST para unirse a la partida
      const url = `http://localhost:8000/partidas/unir?idPartida=${partidaId}&idJugador=${idJugador}`;
      const response = await axios.post(url);

      if (response.status === 200) {
        // Redirigir al lobby si la respuesta es exitosa
        console.log("Jugador unido con exito");
        setTimeout(() => {
          navigate(`/lobby?idJugador=${idJugador}&idPartida=${partidaId}`);
        }, 0);
      } else {
        // Manejar el caso en que la respuesta no sea 200 (por ejemplo, mostrar un mensaje de error)
      }
    } catch (error) {
      // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
      console.error("Error al unirse a la partida:", error);
    }
  };

  return (
    <div className="container_unirse">
      <h2>Lista de Partidas Disponibles</h2>
      <div className="lista_partida">
        {partidas.map((partida) => (
          <div key={partida.id} className="card_partida">
            <h4 className="partida_nombre">
              {partida.nombre}
            </h4>
            <div className="cantidad_jugadores">
            <div className="text_maxmin">
              Max Jugadores: {partida.maxJug}
            </div>
            <div className="text_maxmin">
              Min Jugadores: {partida.minJug}
            </div>
            </div>
            <button
              onClick={() => handleUnirseAPartida(partida.id)}
              className="button_unirse"
            >
              Unirse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnirseAPartida;
