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
    { id: 1, tipo: "accion", nombre: "Aterrador" },
    { id: 2, tipo: "accion", nombre: "Carta2" },
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
    const jugarCartaRequestEvent = {
        "event": "jugar_carta",
        "data": "{\"idJugador\":30,\"idObjetivo\":32,\"idCarta\":510,\"template_carta\":\"Que quede entre nosotros\",\"nombreJugador\":\"t\",\"nombreObjetivo\":\"y\"}"
    };
    act(() => {
    mockWebSocket.onmessage({ data: JSON.stringify(jugarCartaRequestEvent) });
});
    await waitFor(() => {
      const textAvisoDeJugada = getByText("t quiere jugar Que quede entre nosotros sobre y");
      expect(textAvisoDeJugada).toBeInTheDocument();
    }, { timeout: 1000 });

      const efectoEntreNosotros = {
        "event": "Que quede entre nosotros",
        "data": [
            "Hacha",
            "Infectado",
            "Mas vale que corras",
            "Mas vale que corras",
            "Que quede entre nosotros"
        ]
    };
      act(() => {
        mockWebSocket.onmessage({ data: JSON.stringify(efectoEntreNosotros) });
    });
    await waitFor(() => {
        const test = getByText("Hacha");
        expect(test).toBeInTheDocument();
      }, { timeout: 1000 });
  });
});