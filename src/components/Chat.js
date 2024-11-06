import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWebSocket } from './WebSocketContext';
import { useSearchParams } from "react-router-dom";

function Chat({ ancho, alto, idPartida, idJugador, mensajesTest }) {
  const [chatsito, setChatsito] = useState([]);
  const [logs, setLogs] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarChat, setMostrarChat] = useState(true);

  const wsurl = `ws://localhost:8000/partidas/${idPartida}/ws/chat?idJugador=${idJugador}`;
  const webSocket = useWebSocket(wsurl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/partidas/${idPartida}/chat`);
        const mensajes = mensajesTest || response.data.map(chat => ({
          player: chat.player,
          time: chat.time,
          msg: chat.msg,
          isLog: chat.isLog || false,
        }));

        const chatMessages = mensajes.filter(chat => !chat.isLog);
        const logMessages = mensajes.filter(chat => chat.isLog);

        setChatsito(chatMessages);
        setLogs(logMessages);
      } catch (error) {
        console.error('Error al obtener chat:', error);
      }
    };

    fetchData();

    if (webSocket) {
      webSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.event === "chat_msg") {
          const newMessage = {
            player: data.data.player,
            time: data.data.time,
            msg: data.data.msg,
            isLog: data.data.isLog || false,
          };

          if (newMessage.isLog) {
            setLogs((logs) => [...logs, newMessage]);
          } else {
            setChatsito((chatMessages) => [...chatMessages, newMessage]);
          }
        }
      };
    }
  }, [webSocket, idPartida]);

  const handleChat = () => {
    webSocket.send(mensaje);
    // después de enviar, limpio el mensaje para que no quede en el input
    setMensaje('');
  };

  const handleKeyPress = (e) => {
    // para permitir enviar el mensaje con la tecla Enter
    if (e.key === 'Enter') {
      handleChat();
    }
  };

  const cambiarTipoChat = () => {
    setMostrarChat((prevmostrarChat) => !prevmostrarChat);
  };

  return (
    <div>
      <div className="chat-toggle-buttons">
        <button
          onClick={cambiarTipoChat}
          className={"boton-chat"}
          
        >
          Chat
        </button>
        <button
          onClick={cambiarTipoChat}
          className={"boton-logs"}
          
          
        >
          Logs
        </button>
      </div>

      <div className="chat-container" style={{ width: ancho, height: alto }}>
        <div className="chat-messages">
          <div className="message-list">
            {mostrarChat
              ? chatsito.map((chat, index) => (
                  <div key={index} className="message">
                    <span className="message-player">{chat.player}:</span>
                    <span className="message-text"> {chat.msg}</span>
                    <span className="message-time"> ({chat.time})</span>
                  </div>
                ))
              : logs.map((log, index) => (
                  <div key={index} className="message">
                    <span className="message-text"> {log.msg}</span>
                    <span className="message-time"> ({log.time})</span>
                  </div>
                ))}
          </div>
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribi tu mensaje..."
            className="chat-input"
          />
          <button onClick={handleChat} className="button2">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
