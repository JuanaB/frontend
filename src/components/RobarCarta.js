import React, {useState} from "react";
import axios from "axios";


function RobarCarta({ idJugador, esTurno, cantidadCartasEnMano }) {
  const [estadoPartida, setEstadoPartida] = useState("");
  //los estados del jugador y las cartas en null porque no tenemos informacion

  const recargarPagina = () => {
    // Recarga la página actual
    window.location.reload();
  };

  const handleDrawCard = async () => {
    try {
      //pido al back informacion

      // Se roba la carta y se actualiza
       await axios.put(
        `http://localhost:8000/jugadores/${idJugador}/robar`
      );

      recargarPagina();
    } catch (error) {
      console.error("Error al robar una carta:", error);
      setEstadoPartida(error.response.data.detail);
    }
  };

  if (!esTurno || cantidadCartasEnMano === 5) {
    return <div></div>;
  }

  return (
    <div className="text-center mt-3">
      <button onClick={handleDrawCard} className="btn btn-primary">
        Robar Carta
      </button>
      {
          
          <div className="col-md-auto mt-3">
            <h5>{estadoPartida}</h5>
            
          </div>
        }
    </div>
  );
}

export default RobarCarta;
