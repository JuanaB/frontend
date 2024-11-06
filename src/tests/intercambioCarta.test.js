import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import IntercambiarCarta from '../components/IntercambioCarta';
import axios from 'axios';


const jugador = {
  id: 1,
  nombre: 'Pedro',
  cartas: [1, 2, 3, 4],
};

const cartasData = [
  { id: 1, nombre: 'Lanzallamas', tipo: 'Accion' },
  { id: 2, nombre: 'Vigila tus espaldas', tipo: 'Accion' },
  { id: 3, nombre: 'Cambio de lugar', tipo: 'Accion' },
  { id: 4, nombre: 'Sospecha', tipo: 'Accion' },
];

// Simulamos respuesta exitosa
jest.mock('axios');
axios.post.mockResolvedValue({
  data: { cartasData, cantidadCartasMano: jugador.cartas.length },
  status: 200,
});

describe('IntercambiarCarta', () => {
  it('debería renderizar correctamente', () => {
    const { getByText } = render(
      <IntercambiarCarta
        cartasData={cartasData}
        esTurno={true}
        cantidadCartasMano={jugador.cartas.length}
      />
    );

    // Verifica que el botón "Intercambiar Carta" esté en el componente.
    expect(getByText('Intercambiar Carta')).toBeInTheDocument();
  });

  it('debería llamar a la función onClick cuando se hace clic en el botón', async () => {
    const onClick = jest.fn();

    const { getByText } = render(
      <IntercambiarCarta
        cartasData={cartasData}
        esTurno={true}
        cantidadCartasMano={jugador.cartas.length}
        onClick={onClick}
      />
    );

    const button = getByText('Intercambiar Carta');
    fireEvent.click(button);

    // Espera a que la función onClick se llame como resultado de la respuesta exitosa.
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});