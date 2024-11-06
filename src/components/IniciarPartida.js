import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useWebSocket } from './WebSocketContext';
import "../styles/IniciarPartida.css";
import Chat from "./Chat";




function IniciarPartida() {
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [responseText, setResponseText] = useState("");
  const navigate = useNavigate();
  const idPartida = searchParams.get("idPartida");
  const idJugador = searchParams.get("idJugador");
  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws?idJugador=${idJugador}`;
  const webSocket = useWebSocket(wsurl);



    

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/partidas/${idPartida}`
        );
        if (response.status === 200) {
          setPlayers(response.data.jugadores);
          if(response.data.iniciada){
            navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if(webSocket){
      webSocket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log("Datos recibidos:", data);
        if (data.event === "unir"){
          setPlayers(JSON.parse(data.data).jugadores);
        }
        if(data.event === "iniciar"){
          navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
        }
        if (data.event === "abandonar lobby"){
          if ((data.data).host) {
              setTimeout(() => {
                  setResponseText("El host abandonó el lobby, saliendo...");
                  navigate(`/home/crear?idJugador=${idJugador}`);
              }, 2000);
          }
          else {
              if ((data.data).jugadores.id === idJugador) {
                  setTimeout(() => {
                      setResponseText("Saliendo del lobby...");
                      navigate(`/home/crear?idJugador=${idJugador}`);
                  }, 2000);
              }
              setPlayers((data.data).jugadores);
          }
        
      }
      }
    }
    
    fetchData();
    
  }, [idPartida,webSocket,idJugador,navigate]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/partidas/iniciar/${idPartida}?idJugador=${idJugador}`)
      .then((data) =>
        navigate(`/partida?idJugador=${idJugador}&idPartida=${idPartida}`)
      )
      .catch((error) => {
        setResponseText(error.response.data.detail);
        console.log(error);
      });
  };
  const handleAbandonarLobby = async (partidaId) => {
    try {
      // Realizar una solicitud POST para unirse a la partida
      const url = `http://localhost:8000/jugadores/${idJugador}/abandonar_lobby`;
      const response = await axios.put(url);

      if (response.status === 200) {
        // Redirigir al lobby si la respuesta es exitosa
        console.log("Jugador salio con exito");
        setTimeout(() => {
            setResponseText("Jugador salió con exito");
            navigate(`/home/crear?idJugador=${idJugador}`);
            
        }, 0);
      } else {
        console.error("Error al abandonar lobby:");
        // Manejar el caso en que la respuesta no sea 200 (por ejemplo, mostrar un mensaje de error)
      }
    } catch (error) {
      // Manejar errores (por ejemplo, mostrar un mensaje de error al usuario)
      console.error("Error al abandonar lobby:", error);
    }
  };


  return (
    <div className="container_iniciar">
    <div className="subcontainer">
        <h2 className="lobby_tittle">Lobby de la Partida</h2>
        <p>Esperando a los jugadores...</p>
      <div className="jugadores_container">
          {players?.length ? (
            players.map((jugador, index) => (
              <div className="jugador_card_iniciar"
                key={index}
                
              >
              <div>Jugador:</div>
              <div className="nombre_jug">{jugador.nombre}</div>
                
                  
              </div>
            ))
          ) : (
            <div >
              No hay jugadores aún.
            </div>
          )}
      </div>
      <div className="contenedor_b">
        <button className="button_iniciar" onClick={handleSubmit} >
          Iniciar Partida
        </button>
      <button className="button_eliminar" onClick={handleAbandonarLobby} >
          Abandonar Lobby
        </button>
        </div>
        {responseText && (
        <p className="mt-3 alert alert-info">{responseText}</p>
      )}
      </div>
      <div className="chat-container-margen">
        <Chat
          alto={200}
          ancho={700}
          idPartida={idPartida}
          idJugador={idJugador}
          ></Chat>
        </div>
    </div>
  );
}

export default IniciarPartida;