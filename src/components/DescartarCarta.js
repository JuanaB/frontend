import React  from "react";

function DescartarCarta({onClick, esTurno, cantidadCartasEnMano }) {
  if (!esTurno || cantidadCartasEnMano === 4) {
    return <div></div>;
  }
  return (
    <div className="text-center mt-3">
      <button onClick={onClick} className="btn btn-primary">
        Descartar Carta
      </button>
    </div>
  );
}

export default DescartarCarta;
