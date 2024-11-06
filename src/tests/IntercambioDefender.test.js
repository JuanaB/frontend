import React from "react";
import { render, waitFor,act } from "@testing-library/react";
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
    { id: 1, tipo: "defensa", nombre: "Aterrador" },
    { id: 2, tipo: "defensa", nombre: "Carta2" },
  ],
};

jest.mock("../components/WebSocketContext", () => ({
  useWebSocket: () => mockWebSocket,
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "mocked-id"),
  })),
}));

describe("Intercambio defensa", () => {
  it('Mostrar defender cuando se intercambia" event',  () => {
    const { container, getByText } = render(
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
    return waitFor(() => {
      const defenderButton = getByText("Defender");
      const noDefenderButton = getByText("No defender");
      expect(defenderButton).toBeInTheDocument();
      expect(noDefenderButton).toBeInTheDocument();
    }, { timeout: 1000 });
  });
});
