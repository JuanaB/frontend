import React from "react";

function PlayerComponent({ player, seleccionarOponente, onClick }) {
  const { blockIzq = false, blockDer = false, cuarentena = false } = player;
  return (
    <div className={`card ${cuarentena ? "margen-rectangulo" : ""}`}
         style={{width: "150px"}}>
      {seleccionarOponente ? (
        <button
          className={`btn btn-outline-primary ${
            seleccionarOponente ? "" : "disabled"
          }`}
          onClick={() => onClick(player)}
        >
          <div className="card-body d-flex flex-column align-items-center">
            {blockIzq && (
              <div className="barra-marron-izq izquierda"></div>
            )}
            <img
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
              className="card-img-top mb-3"
              alt="Imagen del jugador"
              style={{ width: "100px" }}
            />
            {blockDer && (
              <div className="barra-marron-der"></div>
            )}
            <h5 className="card-title">{player.nombre}</h5>
            <p className="card-text">Posición: {player.posicion}</p>
          </div>
        </button>
      ) : (
          <div className="card-body d-flex flex-column align-items-center">
            {blockIzq && (
            <div className="barra-marron-izq"></div>
          )}
            <img
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
              className="card-img-top mb-3"
              alt="Imagen del jugador"
              style={{ width: "100px" }}
            />
            {blockDer && (
            <div className="barra-marron-der"></div>
            )}
            <h5 className="card-title">{player.nombre}</h5>
          </div>

      )}

    </div>
  );
}

export default PlayerComponent;
