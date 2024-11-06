import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LaCosaTerminaPartida from '../components/LaCosaTerminaPartida';

// Mockeo un jugador
const jugador = {
  id: 1000,
  nombre: 'Cosa',
  rol: 'La cosa', // El jugador tiene el rol la cosa
};

// Mock de axios para simular la llamada a la API
jest.mock('axios');

test('Llama a handleLaCosaTerminaPartida al hacer clic en el boton', async () => {
  const { getByText } = render(<LaCosaTerminaPartida idJugador={jugador.id} rol={jugador.rol} />);
  
  // Mockea la respuesta de axios.put
  axios.put.mockResolvedValue({ status: 200 });

  // Simula el click en el boton
  fireEvent.click(getByText('Terminar Partida'));

  await waitFor(() => {
    // Verifica que axios.put haya llamado al put
    expect(axios.put).toHaveBeenCalledWith(`http://localhost:8000/jugadores/${jugador.id}/lacosafinaliza`);
  });
});

const jugador2 = {
  id: 1001,
  nombre: 'Humano',
  rol: 'Humano', // El jugador tiene el rol Humano
};

// Mock de axios para simular la llamada a la API
jest.mock('axios');

test('No aparece el boton a quien no es la cosa', async () => {
  const { queryByText } = render(<LaCosaTerminaPartida idJugador={jugador2.id} rol={jugador2.rol} />);
  const button = queryByText('Terminar Partida');
  expect(button).toBeNull();
  });
