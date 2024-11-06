import React from "react";
import { render } from "@testing-library/react";
import JugarCarta from "../components/JugarCarta";


describe("Componente JugarCarta", () => {
  it("debería renderizarse sin errores", () => {
    const { getByText } = render(<JugarCarta esTurno={true} cantidadCartasMano={5} />);
    expect(getByText("Jugar Carta")).toBeInTheDocument();
  });
});


describe("Componente JugarCarta", () => {
    it("debería dar error", () => {
      const { getByText } = render(<JugarCarta esTurno={false} cantidadCartasMano={4} />);
      expect(getByText("Jugar Carta")).toBeInTheDocument();
    });
  });