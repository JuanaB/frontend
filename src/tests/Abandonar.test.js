import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import IniciarPartida from '../components/IniciarPartida';
import { WebSocketProvider } from '../components/WebSocketContext';

jest.mock('axios');

describe('IniciarPartida Component', () => {
  it('renderiza el componente', async () => {
    //mockea respuesta del get
    axios.get.mockResolvedValue({ data: [{ nombre: 'nombre1' }] });

    render(
      <BrowserRouter>
        <WebSocketProvider>
          <IniciarPartida />
        </WebSocketProvider>
      </BrowserRouter>
    );

    // el boton de abandonar deberia estar en el lobby
    const abandonarLobbyButton = screen.getByText('Abandonar Lobby');
    expect(abandonarLobbyButton).toBeInTheDocument();
  });

  it('maneja el click del boton Abandonar Lobby', async () => {
    // mockea respuesta del get
    axios.get.mockResolvedValue({ data: [{ nombre: 'nombre1' }] });

    const {getByText} = render(
      <BrowserRouter>
        <WebSocketProvider>
          <IniciarPartida />
        </WebSocketProvider>
      </BrowserRouter>
    );

    // settea el boton
    const abandonarLobbyButton = getByText("Abandonar Lobby");

    // mockea la respuesta del back
    axios.put.mockResolvedValue({status: 200, data: { message: "Jugador salió con exito" }});

    act(() => {
      fireEvent.click(abandonarLobbyButton);
    });


    await waitFor(() => {
      // Verifica que el mensaje de exito se muestra en el componente, tras haber tocado el boton
      expect(getByText("Jugador salió con exito")).toBeInTheDocument();
    });
  });

});