import React from "react";

function CartaComponent({
  carta,

  esTurnoJugarCarta,
  esTurnoDefender,

  esTurnoIntercambiarCarta,
  onClickEfectoLanzallama,
  onClickJugarCarta,
  onClickIntercambiarCarta,


  descartandoCarta,
  jugandoCarta,

  onDescartarCarta,
}) {
  const onClick = () => {
    if(esTurnoJugarCarta  && !descartandoCarta){
      if (carta.nombre === "Lanzallamas" || 
      carta.nombre === "Analisis" ||
      carta.nombre === "Sospecha" ||
      carta.nombre === "Que quede entre nosotros" ||
      carta.nombre === "Whisky" ||
      carta.nombre === "Cambio de lugar" ||
      carta.nombre === "Mas vale que corras" ||
      carta.nombre === "Seduccion" ||
      carta.nombre === "Hacha" ||
      carta.nombre === "Cuarentena" ||
      carta.nombre === "Puerta atrancada") {
        console.log("esLanza, alguna carta");
        onClickEfectoLanzallama(carta);
      } else {
        onClickJugarCarta(carta);
      }
    }
    else if (esTurnoDefender)  {
      console.log(`esDefender, algun carta`);
      if (carta.tipo === "Defensa") {
        onClickJugarCarta(carta);
      }
    }

    if (esTurnoIntercambiarCarta) {
        console.log("aaa")
        onClickIntercambiarCarta(carta);
    }


    else if (jugandoCarta) {
      onClickJugarCarta(carta);
    } else if (descartandoCarta) {
      onDescartarCarta(carta);
    } 

  };

  return (
    <div className="bg-info-subtle">

      {esTurnoJugarCarta ||  esTurnoDefender || jugandoCarta || descartandoCarta || esTurnoIntercambiarCarta ? (


        <button className="btn btn-outline-primary" onClick={onClick} data-testid="onClickCarta">
          <div
            className="card bg-info-subtle"
            style={{ width: "10.5rem", height: "18rem" }}
          >
            <div className="card-body d-flex flex-column justify-content-around">
              <h5 className="card-title text-center">{carta.nombre}</h5>
              <p className="card-text text-center smaller-font">{carta.descripcion}</p>
              <p className="card-text text-center text-primary">{carta.tipo}</p>
            </div>
          </div>
        </button>
      ) : (
        <div
          className="card bg-info-subtle"
          style={{ width: "10.5rem", height: "18rem" }}
        >
          <div className="card-body d-flex flex-column justify-content-around">
            <h5 className="card-title text-center">{carta.nombre}</h5>
            <p className="card-text text-center smaller-font">{carta.descripcion}</p>
            <p className="card-text text-center text-primary">{carta.tipo}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartaComponent;
