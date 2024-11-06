import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { useWebSocket } from './WebSocketContext';
import {useSearchParams, useNavigate} from "react-router-dom";
import {actualizarPartida} from './Partida2';
import CartaComponent from "./Carta";
import ResponderIntercambio from './ResponderIntercambio';
import FinalizarPartida from "./FinalizarPartida";


function Defensa({ jugadorActual, webSocket, onResponderIntercambio}) {
  const [idCarta, setIdCarta] = useState('');
  const [players, setPlayers] = useState([]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [cartasDefensa, setCartasDefensa] = useState([]);
  const [modoDefensa, setModoDefensa] = useState(false); // Nuevo estado para controlar el modo defensa
  const [searchParams] = useSearchParams();
  const [mostrarBotones, ] = useState(false);
  //const [partida, setPartida] = useState(null);
  const [defender, setDefender] = useState(false); // Estado para rastrear si el jugador está defendiend
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  const [estadoPartida, setEstadoPartida] = useState("");
  const [efectoAnalisis, setEfectoAnalisis] = useState(false);
  const [cartasOtro, setCartasOtro] = useState([]);
  const cartasData = jugadorActual.cartas;
  const [modoElegirCarta, setModoElegirCarta] = useState(false);
  const [respondiendoIntercambio, setRespondiendoIntercambio] = useState(false);
  const [efectoWhisky, setEfectoWhisky] = useState(false);       //agregado por whisky
  const [cartasMismoJugador, setcartasMismoJugador] = useState([]);   //agregado para mostrar cartas whisky
  const [efectoUps, setEfectoUps] = useState(false);
  const [efectoAterrador, setEfectoAterrador] = useState(false);
  const [entreNosotros, setEntreNosotros] = useState(false);
  const [resultados, setResultados] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("HOLA");
    
    if(webSocket){
        webSocket.onmessage = function(event){
            const data = JSON.parse(event.data);
            console.log("datos recibidos:", data);
            if(data.event === "jugar_carta"){
                const datinha = JSON.parse(data.data)
                
                if (idJugador != datinha.idJugador) {
                    setEstadoPartida(`${datinha.nombreJugador} quiere jugar ${datinha.template_carta} sobre ${datinha.nombreObjetivo}`);
                }
                
                if(datinha.idObjetivo == idJugador){
                  var nuevasCartasDefensa = [];
                  // var nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.tipo.toLowerCase() === 'defensa');
                  if (datinha.template_carta === "Lanzallamas") {
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.tipo.toLowerCase() === 'defensa');
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.nombre === "Nada de barbacoas");
                  }
                  if (datinha.template_carta === "Cambio de lugar" || datinha.template_carta === "Mas vale que corras") {
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.tipo.toLowerCase() === 'defensa');
                    nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.nombre === "Aqui estoy bien");
                  }

                  setCartasDefensa(nuevasCartasDefensa);
                  console.log(cartasDefensa);
                  if (cartasDefensa == []) {
                      setEstadoPartida("No tienes con que defenderte");
                  }
                  console.log();
                  setModoDefensa(true);
                }
 
            }
             if (data.event === "Whisky") {
              setcartasMismoJugador(data.data);
              setEfectoWhisky(true);
              
            
             }
            if (data.event === "Ups") {
              setcartasMismoJugador(data.data);
              setEfectoUps(true);
            }

          
          if(data.event === "Aterrador"){
            setEfectoAterrador(true); 
            setCartasOtro(data.data);
          }
            if(data.event === "jugar_resp"){
              
                if (idJugador != jugadorActual) {
                    setEstadoPartida(`${data.data.nombreJugador} quiere jugar defenderse del ataque`); 
                }// este no se porque todavia no sabemos como lo pasa el back, pero solo avisa si se defendio o no
            }
            if (data.event === "fin_turno_jugar") {
              // actualizarPartida(JSON.parse(data.data))
              
              setTimeout(() => {
                setEstadoPartida("El oponente terminó de jugar carta");
                setTimeout(() => {
window.location.reload();
                }, 500);
              }, 2000);
            }
            if(data.event === "defensa_erronea"){
              setEstadoPartida("Elige una carta de defensa valida");
              setModoDefensa(true);
            }
            if(data.event === "Analisis") {
              setEfectoAnalisis(true);
              setCartasOtro(data.data);
            }
            if(data.event === "Que quede entre nosotros") {
              setEntreNosotros(true);
              setCartasOtro(data.data);
            }
            
              if(data.event === "intercambio_request") {
                  console.log("te estan intercambiando");
                  setEstadoPartida(`Te quieren intercambiar`);
                  
                  setRespondiendoIntercambio(true); 
                  console.log("te estan intercambiando");
                  setEstadoPartida(`Te quieren intercambiar`);
                  let nuevasCartasDefensa = [];
                  nuevasCartasDefensa = jugadorActual.cartas.filter(carta => carta.tipo.toLowerCase() === 'defensa');
                  console.log(nuevasCartasDefensa)
                  nuevasCartasDefensa = nuevasCartasDefensa.filter(carta => 
                    carta.nombre === "No, gracias" || 
                    carta.nombre.toLowerCase() === "fallaste" || 
                    carta.nombre === "Aterrador"
                  );
                  

                  setCartasDefensa(nuevasCartasDefensa);
                  console.log(nuevasCartasDefensa);
                  if (nuevasCartasDefensa.length == 0) {
                      setEstadoPartida("No tienes con que defenderte al intercambio, selecciona una carta");
                      onResponderIntercambio();
                  }else{
                    setModoDefensa(true);
                    
                  }
                  
                  
              }
              if(data.event === "intercambio") {
                  console.log("Otro esta en intercambio");
                  setEstadoPartida("Otro esta intercambiando");
              }
              if(data.event === "intercambio exitoso") {
                  console.log("intercambio exitoso");
window.location.reload();
              }
              if(data.event === "fin_de_turno") {
                  console.log("fin de turno");
                  setEstadoPartida("Fin de intercambio y de turno");
window.location.reload();
                  
              }
              if(data.event === "sospecha") {
                console.log("sospecha");
                setEstadoPartida("Estas jugando Sospecha, elige una carta:");
                var opciones = ["1", "2", "3", "4"];
                var opciones2 = opciones.join("\n");
                
                var elegistebien = false;
                while(!elegistebien){
                  var eleccion = prompt("Eligi una:\n" + opciones2);
                  if (opciones.includes(eleccion)) {
                    alert("Elegiste: " + eleccion);
                      setEstadoPartida("La carta de tu oponente que elegiste es:" + data.data[eleccion-1]);
                      elegistebien = true;
                  } else {
                    alert("Elegi de nuevo");
                  }
                }
                

                
              }
              if (data.event === "finalizar"){
                const datinha = JSON.parse(data.data)
                console.log(datinha.isHumanoTeamWinner)
                console.log(datinha.winners)
                setResultados(datinha);
                
                
              }       
              
        }
    }
    if(resultados!=null) {
      navigate(`/partida-resultados`);
    }
    
    //const algunaCartaEsDefensa = jugadorActual.cartas.some(carta => carta.tipo === 'defensa');
    //setModoDefensa(algunaCartaEsDefensa);
  }, [idCarta, webSocket]);

  const handleCartaSeleccionada = (carta) => {
    setCartaSeleccionada(carta);
  };
  const handleDefender = () => {
    if (modoDefensa) {
      setDefender(true);
    }
  };

  const handleNoDefender = () => {
    
    if (modoDefensa) {
      setDefender(false);
    }
  
  };
  const handleJugarCartaDefensa = (cartaSeleccionada) => {
      // Enviar la carta seleccionada al servidor a través de WebSocket
      if(!respondiendoIntercambio){
      const mensaje = {
        defendido: defender,
        idCarta: cartaSeleccionada.id,
      };

      const mensajeJSON = JSON.stringify(mensaje);
      webSocket.send(mensajeJSON);
    }else{
      if(cartaSeleccionada){
      console.log("Gsdfsd")
        const mensaje = {
          'aceptado': false,
        'data': cartaSeleccionada.id,
      };
      
      const mensajeJSON = JSON.stringify(mensaje);
      webSocket.send(mensajeJSON);
      setRespondiendoIntercambio(false);
      
      if(cartaSeleccionada.nombre === "Fallaste") {
        setModoDefensa(false);
      }
      
      }else{
        console.log("gola")
        onResponderIntercambio();
        setModoDefensa(false);
      }}
      
  };
  if(resultados!=null) {
    return (<FinalizarPartida isHumanoTeamWinner={resultados.isHumanoTeamWinner}
      winners={resultados.winners} idJugador={idJugador}></FinalizarPartida>)
  }
  else {
    return (<div className="row">
      {!modoDefensa &&(<ResponderIntercambio
              cartasData={cartasData}
              cantidadCartasEnMano={cartasData.length}
              webSocket2={webSocket}
              modoElegirCarta={modoElegirCarta}
            ></ResponderIntercambio>)}
    {modoDefensa && (
    
      <div className="row justify-content-center">
        {cartasDefensa.map((carta) => ( // esto esta copiado de partidaencurso, te deja seleccionar las cartas, se ve desfasado (hay que arreglar)
          <div className="col-md-auto" key={carta.id}>
              {defender && (<CartaComponent
                esTurnoDefender={modoDefensa} // Indica que es un turno para jugar carta de defensa (ver componente Carta)
                carta={carta}
                onClickJugarCarta={handleJugarCartaDefensa} // se le pasa la funcion (esto creo que no hace nada, que se hace cuando apretas el boton, habria que pasar otra cosa, no se xd)
              />)}
            </div>
          ))}  
      </div>
        
    )}
    
    {modoDefensa && ( //todo esto esta asi nomas, se ve muy feo pero anda 
      <div>
      <button onClick={handleDefender} className="btn btn-primary">Defender</button>
      <button onClick={() => handleJugarCartaDefensa(false)} className="btn btn-primary">No defender</button>
      </div>
    )}

        {(efectoAnalisis) && (
          
          <div className="col-md-auto mt-3">
            <h5>Analisis: Las cartas del otro son: </h5>
            {cartasOtro.map((carta, index) => (
            <div key={index}>{carta}</div>
             ))}
            
            
          </div>
        )}
        {(efectoAterrador) && (
          
          <div className="col-md-auto mt-3">
            <h5>Aterrador: La carta del otro es: </h5>
            <div >{cartasOtro}</div>
            
            
          </div>
        )}
         {efectoWhisky  && (
          <div className="cartas_mismo_jugador">
          <h4>Cartas del jugador que jugó whisky:</h4>
            {cartasMismoJugador.map((carta, index) => (
            <div key={index}>{carta}</div>
             ))}
          </div>
        )}
        {efectoUps && (
          <div className="cartas_mismo_jugador">
          <h4>Ups: Cartas del jugador que jugó ups:</h4>
            {cartasMismoJugador.map((carta, index) => (
            <div key={index}>{carta}</div>
             ))}
             </div>
        )} 
        {(entreNosotros) && (
          
          <div className="col-md-auto mt-3">
            <h5>Entre Nosotros: Las cartas del otro son: </h5>
            {cartasOtro.map((carta, index) => (
            <div key={index}>{carta}</div>
             ))}
            
            
          </div>
        )}
        {
          
          
        <div className="col-md-auto mt-3">
          <h5>{estadoPartida}</h5>
          
        </div>
      }
    </div>)
  }
}

export default Defensa;