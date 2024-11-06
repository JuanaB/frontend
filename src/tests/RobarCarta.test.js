import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RobarCarta from '../components/RobarCarta';

// Simulamos un jugador en su turno con menos de 5 cartas en la mano
const jugador = {
  id: 1,
  nombre: 'Juan',
  cartas: [1, 2, 3, 4], // Supongamos que ya tiene 4 cartas en la mano
};

test('Renderiza el botón de "Robar Carta" cuando es el turno del jugador', () => {
  const { getByText } = render(<RobarCarta idJugador={jugador.id} esTurno={true} cantidadCartasEnMano={jugador.cartas.length} />);
  const button = getByText('Robar Carta');
  expect(button).toBeInTheDocument();
});


// Simulamos un jugador que no está en su turno o ya tiene 5 cartas en la mano
const jugador2 = {
  id: 2,
  nombre: 'Maria',
  cartas: [1, 2, 3, 4, 5], // Supongamos que ya tiene 5 cartas en la mano
};

test('No renderiza el botón de "Robar Carta" cuando no es el turno del jugador', () => {
  const { queryByText } = render(<RobarCarta idJugador={jugador2.id} esTurno={false} cantidadCartasEnMano={jugador2.cartas.length} />);
  const button = queryByText('Robar Carta');
  expect(button).toBeNull();
});

test('No renderiza el botón de "Robar Carta" cuando el jugador ya tiene 5 cartas en la mano', () => {
  const { queryByText } = render(<RobarCarta idJugador={jugador2.id} esTurno={true} cantidadCartasEnMano={jugador2.cartas.length} />);
  const button = queryByText('Robar Carta');
  expect(button).toBeNull();
});