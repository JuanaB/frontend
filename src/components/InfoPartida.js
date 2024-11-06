// InfoPartida.js
import React from "react";
import "../styles/InfoPartida.css";
import LaCosaTerminaPartida from "./LaCosaTerminaPartida";
import handleLaCosaTerminaPartida from "./LaCosaTerminaPartida";
import Chat from "./Chat";

function InfoPartida({
  jugadorConTurnoActual,
  esTurno,
  sentido,
  partida,
  jugadorEnJuego,
  idJugador,
  idPartida,
}) {
  return (
    <div className="container-info">
      <h5 className="titulo_info">Datos de la Partida</h5>
      <div className="item_info">
        <div className="item_title">Partida:</div> <div>{partida.nombre}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Tú eres:</div> <div>{jugadorEnJuego?.nombre}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Turno Actual:</div> <div>{jugadorConTurnoActual.nombre}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Estado:</div>{" "}
        <div>{esTurno ? "Es tu turno" : "No es tu turno"}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Sentido:</div> <div>{sentido ? "Horario" : "Antihorario"}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Rol:</div> <div>{jugadorEnJuego.rol}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Posición:</div> <div>{jugadorEnJuego.posicion}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Bloqueo Izquierdo:</div> <div>{jugadorEnJuego.blockIzq ? "true" : "false"}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Bloqueo Derecho:</div> <div>{jugadorEnJuego.blockDer ? "true" : "false"}</div>
      </div>
      <div className="item_info">
        <div className="item_title">Cuarentena:</div> <div>{jugadorEnJuego.cuarentena ? "true" : "false"}</div>
      </div>



      {(jugadorEnJuego.rol === "La cosa") && (
          
          <LaCosaTerminaPartida 
          idJugador={idJugador}
          rol={jugadorEnJuego.rol}
          ></LaCosaTerminaPartida>
        )}
        <div className="chat-container-margen">
          <Chat
          alto={300}
          ancho={300}
          idPartida={idPartida}
          idJugador={idJugador}
          ></Chat>
        </div>
    </div>
  );
}

export default InfoPartida;
