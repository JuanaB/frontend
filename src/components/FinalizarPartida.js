import React from "react";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import "../styles/FinalizarPartida.css";

const FinalizarPartida = ({ isHumanoTeamWinner, winners, idJugador}) => {
  const navigate = useNavigate();
  let mensaje = "";
  let ganadoresMensaje = "";
  // Metodos
  const navigateToHome = () => {
    navigate(`/home/crear?idJugador=${idJugador}`);
  };

  if (isHumanoTeamWinner) {
    mensaje =
      "La partida termina porque los Humanos ganaron como equipo. Los ganadores son:";
  } else {
    mensaje =
      "La partida termina porque La Cosa y los Infectados ganaron como equipo. Los ganadores son:";
  }

  if (winners.length > 0) {
    ganadoresMensaje = winners.map((jugador, index) => (
      <div
        className="carta-jugador"
        key={index}
      >
          {`Jugador ${jugador}`}
      </div>
    ));
  }

  return (
    <div className="container_principal2">
      <h2 className="title">FIN DE LA PARTIDA</h2>
      <p className="mensaje">{mensaje}</p>
      <div className="list">{ganadoresMensaje}</div>
      <div className="p-10"></div>
      <div className="button-space">
      <CustomButton
        text={"Volver al Inicio"}
        onClick={navigateToHome}
      ></CustomButton></div>
    </div>
  );
};

export default FinalizarPartida;
