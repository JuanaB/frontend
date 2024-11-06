import React from "react";
import { render, waitFor,act, fireEvent } from "@testing-library/react";
import Defensa from "../components/Defender";
import { BrowserRouter } from "react-router-dom";

const mockWebSocket = {
  send: jest.fn(),
  onmessage: jest.fn(),
};

const jugador = {
  id: 1,
  nombre: "Pedro",
  cartas: [
    { id: 1, tipo: "Defensa", nombre: "Aterrador" },
    { id: 2, tipo: "defensa", nombre: "Carta2" },
  ],
};

jest.mock("../components/WebSocketContext", () => ({
  useWebSocket: () => mockWebSocket,
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "mocked-id"),
  })),
}));

describe("Efecto Cartas", () => {
  it('Al jugar aterrador en respuesta de un intercambio, muestra la carta del otro" event',  async () => {
    const { container, getByText, getByTestId} = render(
      <BrowserRouter>
        <Defensa jugadorActual={jugador} webSocket={mockWebSocket} />
      </BrowserRouter>
    );
    console.log(container.innerHTML);
    const intercambioRequestEvent = {
      event: "intercambio_request",
      data: {
        id: 17,
        descartada: false,
        template_carta: "Determinacion",
        jugador: 4,
        partida: 1,
      },
    };
    act(() => {
    mockWebSocket.onmessage({ data: JSON.stringify(intercambioRequestEvent) });
});
    await waitFor(() => {
      const defenderButton = getByText("Defender");
      const noDefenderButton = getByText("No defender");
      expect(defenderButton).toBeInTheDocument();
      expect(noDefenderButton).toBeInTheDocument();
    }, { timeout: 1000 });

    act(() => {
        fireEvent.click(getByText("Defender"));
      });

      await waitFor(() => {
        const test = getByText("Aterrador");
        expect(test).toBeInTheDocument();
      }, { timeout: 1000 });

      act(() => {
        fireEvent.click(getByTestId("onClickCarta"));
      });

      const efectoAterrador = {
        event: "Aterrador",
        data: "Infectado",
      };
      act(() => {
        mockWebSocket.onmessage({ data: JSON.stringify(efectoAterrador) });
    });
    await waitFor(() => {
        const test = getByText("Infectado");
        expect(test).toBeInTheDocument();
      }, { timeout: 1000 });
  });
});
