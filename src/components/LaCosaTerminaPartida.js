import React  from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function LaCosaTerminaPartida({onClick, idJugador, rol}) {

    const handleLaCosaTerminaPartida = async (partidaId) => {
        console.log("a");
        try {
          console.log(idJugador);
          const url = `http://localhost:8000/jugadores/${idJugador}/lacosafinaliza`;
          const response = await axios.put(url);
    
          if (response.status === 200) {

            console.log("Exito en lacosafinaliza");

          } else {
            console.error("Error en la cosa finaliza");
            
          }
        } catch (error) {

          console.error("Error en la cosa finaliza", error);
        }
      };

      if (rol !== "La cosa") {
        return <div></div>;
      }
  return (
    <div className="text-center mt-3">
      <button onClick={handleLaCosaTerminaPartida} className="btn btn-primary">
        Terminar Partida
      </button>
    </div>
  );
}

export default LaCosaTerminaPartida;