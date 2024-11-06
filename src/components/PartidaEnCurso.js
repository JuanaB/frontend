import React, { useState } from "react";
import PlayerComponent from "./Jugador";
import axios from "axios";
import CartaComponent from "./Carta";
import RobarCarta from "./RobarCarta";
import JugarCarta from "./JugarCarta";

import Defensa from "./Defender";
import IntercambiarCarta from "./IntercambioCarta";
import ResponderIntercambio from "./ResponderIntercambio";
import { useWebSocket } from './WebSocketContext';
import {useSearchParams } from "react-router-dom";

import DescartarCarta from "./DescartarCarta";
import "../styles/PartidaEnCurso.css";


function PartidaEnCurso({ oponentes, jugadorActual, esTurno, idJugador, oponentesConJugadorMismo }) {
  const [habilitarSeleccionarOponente, setHabilitarSeleccionarOponente] =
    useState(false);
  const [carta, setCarta] = useState(null);
  const [jugandoCarta, setJugandoCarta] = useState(false);

  const [intercambiandoCarta, setIntercambiandoCarta] = useState(false);

  const [searchParams] = useSearchParams();
  const idPartida = searchParams.get("idPartida");
  const [modoElegirCarta, setModoElegirCarta] = useState(false);
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`; // borrar 
  const webSocket = useWebSocket(wsurl);

  const [descartandoCarta, setDescartandoCarta] = useState(false);
  const cartasData = jugadorActual.cartas;
  const [estadoPartida, setEstadoPartida] = useState("");
  const [respondiendoIntercambio, setRespondiendoIntercambio] = useState(false);
  // Metodos del componente

  // aprieta un lanzallamas
  const onClickEfectoLanzallama = (cartaAJugar) => {
    console.log("dfsfdssd");
    setHabilitarSeleccionarOponente(true);
    setCarta(cartaAJugar);
    
  };

  const onJugarCarta = () => {
    setJugandoCarta(true);
  };

  const onResponderIntercambio = () => {
    setJugandoCarta(true);
    setRespondiendoIntercambio(true);
  };


  const onIntercambiarCarta = () => {
    //setHabilitarSeleccionarOponente(true);
    console.log("AAAA");
    setIntercambiandoCarta(true);
  }
  const onClickDescartarCarta = async (cartaADescartar) => {
    // simplemente juega la carta
    // Jugar la carta
    try {
      console.log(cartaADescartar)
      await axios.put(
        `http://localhost:8000/cartas/descartar_carta/${cartaADescartar.id}`
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setEstadoPartida(error.response.data.detail);
    }

  };

  const onClickJugarCarta = async (cartaAJugar) => {
    // simplemente juega la carta
    // Jugar la carta
    console.log("AAAA");
    if(!respondiendoIntercambio){
    try {
      await axios.post(
        `http://localhost:8000/cartas/jugar?id_carta=${cartaAJugar.id}`
      );
      console.log("Carta jugada exitosamente");
    } catch (error) {
      console.log(error);

    }}else{
          const mensaje = {
        'aceptado': true,
      'data': cartaAJugar.id,
    };

    const mensajeJSON = JSON.stringify(mensaje);
    webSocket.send(mensajeJSON);
  

    }
  };
 


  const onDescartarCarta = async () => {
    setDescartandoCarta(true);
  };



  const onSetOponente = async (opnenteAJugar) => {
    console.log("Carta a jugar");
    console.log(carta);
    console.log("Oponente a jugar");
    console.log(opnenteAJugar);
    
    

    try {
      if (!intercambiandoCarta) {
        await axios.post(
          `http://localhost:8000/cartas/jugar?id_carta=${carta.id}&id_objetivo=${opnenteAJugar.id}`
        );
      }
      if (intercambiandoCarta) {
        await axios.put(
          `http://localhost:8000/cartas/${carta.id}/intercambiar?idObjetivo=${opnenteAJugar.id}`
        );
      }
      console.log("Jugador eliminado exitosamente");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container_partida_encurso">
      <div className="jugadores_cards">
      {(carta && carta.nombre === "Hacha" ? oponentesConJugadorMismo : oponentes).map((jugador) => (
        <div className="player_card" key={jugador.id}>
          <PlayerComponent
            player={jugador}
            seleccionarOponente={habilitarSeleccionarOponente}
            onClick={onSetOponente}
          />
        </div>
      ))}

      </div>
      <div className="mazo_container">
        <div className="mazo">
          <h5>Mazo</h5>

          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>
        <div className="mazo">
          <h5>Descartes</h5>
          <img
            src="https://dejpknyizje2n.cloudfront.net/marketplace/products/35568e8161034e6a9c1d71704ff96846.png"
            alt="Mazo de cartas"
            style={{ width: "75px" }}
          />
        </div>

          
        
          
        <div className="botones_juego">

          {esTurno && cartasData.length === 4 && (
            <RobarCarta
              idJugador={idJugador}
              esTurno={esTurno}
              cantidadCartasEnMano={cartasData.length}
            ></RobarCarta>
          )}

          {esTurno && cartasData.length === 5 && (!jugandoCarta && !descartandoCarta) && (
            <JugarCarta
              esTurno={esTurno}
              onClick={onJugarCarta}
              cantidadCartasEnMano={cartasData.length}
            ></JugarCarta>
            
          )}
          {esTurno && cartasData.length === 5 && (!jugandoCarta && !descartandoCarta) && (
            <DescartarCarta 
              onClick={onDescartarCarta}
              esTurno={esTurno}
              cantidadCartasEnMano={cartasData.length}
              ></DescartarCarta>
            
          )}

          
            
          

          {jugandoCarta && !habilitarSeleccionarOponente && !respondiendoIntercambio && (
            <div>Selecciona una carta para jugar</div>
          )}
          {descartandoCarta &&  (
            <div>Selecciona una carta para descartar</div>
          )}
          {habilitarSeleccionarOponente && (
            <div>Selecciona un oponente </div>
          )}
          {respondiendoIntercambio && (
            <div>Te estan intercambiando, selecciona una carta </div>
          )}
          <Defensa 
          onResponderIntercambio={onResponderIntercambio}
          jugadorActual={jugadorActual}
          webSocket={webSocket}>
          </Defensa>
          
          {esTurno && cartasData.length === 4 && !intercambiandoCarta && (
            <IntercambiarCarta 
              esTurno={esTurno}
              onClick={onIntercambiarCarta}
              cantidadCartasEnMano={cartasData.length} >
            </IntercambiarCarta>
          )}
        </div>
      </div>
      {
          
          <div className="col-md-auto mt-3">
            <h5>{estadoPartida}</h5>
            
          </div>
        }

      <div className="mano">
        {/* Mostrar la mano del jugador actual */}
        <h3 className="">Mano actual</h3>
        <div className="cartas_mano">
          {cartasData.map((carta) => (
            <div className="carta_mano" key={carta.id}>
              <CartaComponent

                esTurnoJugarCarta={jugandoCarta}
                esTurnoIntercambiarCarta={intercambiandoCarta}

                onClickIntercambiarCarta={onClickEfectoLanzallama}

                
                jugandoCarta={jugandoCarta}
                descartandoCarta={descartandoCarta}
                carta={carta}
                onClickEfectoLanzallama={onClickEfectoLanzallama}
                onClickJugarCarta={onClickJugarCarta}
                onDescartarCarta={onClickDescartarCarta}

              ></CartaComponent>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}


export default PartidaEnCurso;
