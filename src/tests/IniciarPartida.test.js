import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import IniciarPartida from '../components/IniciarPartida';
import { WebSocketProvider } from '../components/WebSocketContext'; // Importa el WebSocketProvider

// Mock de Axios para simular solicitudes HTTP
jest.mock('axios');

describe('IniciarPartida Component', () => {
  it('renderiza el componente', async () => {
    // Configura una respuesta simulada para la solicitud HTTP (puedes personalizarla según tus necesidades)
    axios.get.mockResolvedValue({ data: [{ nombre: 'nombre1' }] });

    render(
      <BrowserRouter>
        {/* Utiliza el WebSocketProvider para configurar el contexto WebSocket */}
        <WebSocketProvider>
          <IniciarPartida />
        </WebSocketProvider>
      </BrowserRouter>
    );

    // Espera a que se resuelva la solicitud HTTP antes de realizar aserciones
    const iniciarPartidaButton = screen.getByText('Iniciar Partida');
    expect(iniciarPartidaButton).toBeInTheDocument();
  });
});
