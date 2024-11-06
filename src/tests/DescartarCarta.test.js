import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PartidaEnCurso from '../components/PartidaEnCurso';
import DescartarCarta from '../components/DescartarCarta';

// Simulamos un jugador en su turno con 5 cartas en la mano
const jugador = {
    id: 1,
    cartas: [1, 2, 3, 4, 5],
  };
  
  test('Es el turno del jugador y cantidad cartas correcta', () => {
    const { getByText } = 
        render(<DescartarCarta idJugador={jugador.id} esTurno={true} 
        cantidadCartasEnMano={jugador.cartas.length} />);
    const button = getByText('Descartar Carta');
    expect(button).toBeInTheDocument();
  });
  
  
  // Simulamos un jugador que no está en su turno o ya tiene 4 cartas en la mano
  const jugador2 = {
    id: 2,
    cartas: [1, 2, 3, 4],
  };
  
  test('No es el turno del jugador', () => {
    const { queryByText } = 
        render(<DescartarCarta idJugador={jugador2.id} esTurno={false}
        cantidadCartasEnMano={jugador2.cartas.length} />);
    const button = queryByText('Descartar Carta');
    expect(button).toBeNull();
  });
  
  test('Jugador ya tiene 4 cartas en la mano', () => {
    const { queryByText } = 
        render(<DescartarCarta idJugador={jugador2.id} esTurno={true}
             cantidadCartasEnMano={jugador2.cartas.length} />);
    const button = queryByText('Descartar Carta');
    expect(button).toBeNull();
  });