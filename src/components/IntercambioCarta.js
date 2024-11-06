import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useWebSocket } from './WebSocketContext';
import {useSearchParams } from "react-router-dom";
import CartaComponent from "./Carta";


function IntercambiarCarta({cartasData, esTurno, cantidadCartasMano, onClick}) {
  

  return (
    <div className="row">
      
    
    <div className="text-center mt-3">
      <button onClick={onClick} className="btn btn-primary">
        Intercambiar Carta
      </button>
    </div>
    </div>
    
    
  );
}

export default IntercambiarCarta;
