import { Route, Routes } from "react-router-dom";
import CrearPartida from "./components/CrearPartida";
import Navbar from "./components/NavBar";
import UnirseAPartida from "./components/UnirseAPartida";
import CrearJugador from "./components/CrearJugador";
import IniciarPartida from "./components/IniciarPartida";
import Partida from "./components/Partida2";
import { WebSocketProvider } from './components/WebSocketContext';
import FinalizarPartida from "./components/FinalizarPartida";
import "./styles/App.css";


function App() {
  return (
    <WebSocketProvider>
    <Routes>
      <Route path="/" element={<CrearJugador />} />
      <Route path="home" element={<Navbar />}>
        <Route path="crear" element={<CrearPartida />} />
        <Route path="unir" element={<UnirseAPartida />} />
      </Route>
      <Route path="/lobby/" element={<IniciarPartida />} />
      <Route path="/partida/" element={<Partida />} />
      <Route path="resultados-partida"  element={<FinalizarPartida/>}/>
    </Routes>
    </WebSocketProvider>
  );
}

export default App;
