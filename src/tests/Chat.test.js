import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Chat from '../components/Chat.js';

jest.mock('axios');
jest.mock('../components/WebSocketContext', () => ({
  useWebSocket: jest.fn(() => ({
    send: jest.fn(),
  })),
}));

test('Renderiza correctamente el componente Chat', async () => {
    // mockea la respuesta del get de mensajes
    const mensajesPrueba = [
      { player: 'Jugador1', time: '12:00', msg: 'Holaa' },
      { player: 'Jugador2', time: '12:05', msg: 'Todo bien?' },
      { player: 'Jugador3', time: '12:10', msg: 'Empiecen la partida' },
      { player: 'Jugador4', time: '12:15', msg: 'Dale' },
    ];
  
    const idPartida = 1;
    const idJugador = 1;
    // renderiza el chat
    const { getByText, getByPlaceholderText } = render(
      <Chat alto={300} ancho={300} idPartida={idPartida} idJugador={idJugador} mensajesTest={mensajesPrueba} />
    );
  
    // verifica que esten los botones e input bar
    await waitFor(() => {
      expect(getByText('Enviar')).toBeInTheDocument();
      expect(getByText('Chat')).toBeInTheDocument();
      expect(getByPlaceholderText('Escribi tu mensaje...')).toBeInTheDocument();
  
      // verifica que se muestren los mensajes en el container
      mensajesPrueba.forEach((mensaje) => {
        expect(getByText(mensaje.msg)).toBeInTheDocument();
      });
    });
  });
  

