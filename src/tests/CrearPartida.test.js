import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import CrearPartida from '../components/CrearPartida';
import { MemoryRouter } from 'react-router-dom';

// Mockear la función de axios.post para simular una respuesta exitosa
jest.mock('axios');

describe('CrearPartida', () => {
  it('debe manejar la creación de partida con éxito', async () => {
    // Configura el mock de axios para devolver una respuesta exitosa
    axios.post.mockResolvedValue({
      data: { idPartida: 8 }, // Simula los datos que se recibirían en la respuesta
      status: 201, // Simula el código de estado HTTP
    });
  
    const { getByText, getByTestId } = render(<MemoryRouter><CrearPartida /></MemoryRouter>);
  
    // Simula la entrada de un nombre de partida
    const nombrePartidaInput = getByTestId('nombrePartida');
    fireEvent.change(nombrePartidaInput, { target: { value: 'Mi Partida' } });
  
    // Simula el envío del formulario
    const crearPartidaButton = getByText('Crear Partida', { selector: 'button' });
    fireEvent.click(crearPartidaButton);
  
    // Espera a que la respuesta del backend se refleje en la interfaz
    await waitFor(() => {
      const mensajeRespuesta = getByText('Partida creada exitosamente, redirigiendo al lobby...');
      expect(mensajeRespuesta).toBeInTheDocument();
    });
  });
  
});

describe('CrearPartida', () => {
    it('debe manejar errores al crear la partida', async () => {
      // Configura el mock de axios para simular un error
      axios.post.mockRejectedValue(new Error('Error al crear la partida'));
  
      const { getByText, getByLabelText } = render(<MemoryRouter><CrearPartida /></MemoryRouter>);
  
      // Simula la entrada de un nombre de partida
      const nombrePartidaInput = getByLabelText('Nombre de la partida:');
      fireEvent.change(nombrePartidaInput, { target: { value: 'Mi Partida' } });
  
      // Simula el envío del formulario
      const crearPartidaButton = getByText('Crear Partida', { selector: 'button' });
      fireEvent.click(crearPartidaButton);
  
      // Espera a que el mensaje de error se refleje en la interfaz
      await waitFor(() => {
        const mensajeRespuesta = getByText('Error al crear la partida');
        expect(mensajeRespuesta).toBeInTheDocument();
      });
    });
  });
  