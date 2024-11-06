
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Importa MemoryRouter
import FinalizarPartida from "../components/FinalizarPartida";

test("Renderiza correctamente cuando los humanos ganan", () => {
  const winners = [1, 2, 3]; // Ejemplo de ganadores
  const { getByText } = render(
    <MemoryRouter> {/* Wrap con MemoryRouter */}
      <FinalizarPartida
        isHumanoTeamWinner={true}
        winners={winners}
        idJugador={123}
      />
    </MemoryRouter>
  );

  const mensajeElement = getByText("La partida termina porque los Humanos ganaron como equipo. Los ganadores son:");
  const ganadoresElement = getByText("Jugador 1");

  expect(mensajeElement).toBeInTheDocument();
  expect(ganadoresElement).toBeInTheDocument();
});

test("Renderiza correctamente cuando La Cosa e Infectados ganan", () => {
  const winners = [4, 5, 6]; // Ejemplo de ganadores
  const { getByText } = render(
    <MemoryRouter> {/* Wrap con MemoryRouter */}
      <FinalizarPartida
        isHumanoTeamWinner={false}
        winners={winners}
        idJugador={456}
      />
    </MemoryRouter>
  );

  const mensajeElement = getByText("La partida termina porque La Cosa y los Infectados ganaron como equipo. Los ganadores son:");
  const ganadoresElement = getByText("Jugador 4");

  expect(mensajeElement).toBeInTheDocument();
  expect(ganadoresElement).toBeInTheDocument();
});
