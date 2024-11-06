import { useState, useEffect } from "react";
export default function MultiChoiceModal(props) {
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleOptionChange = (option) => {
      // Lógica para manejar la selección de opciones
      // Puedes usar el estado para realizar un seguimiento de las opciones seleccionadas
      setSelectedOptions((prevSelectedOptions) => {
        if (prevSelectedOptions.includes(option)) {
          return prevSelectedOptions.filter((item) => item !== option);
        } else {
          return [...prevSelectedOptions, option];
        }
      });
    };
  
    const handleConfirm = () => {
      // Lógica para confirmar las selecciones y realizar cualquier acción necesaria
      props.onConfirm(selectedOptions);
    };
  
    return (
      // Renderiza el modal con opciones de selección múltiple
      // Usa `selectedOptions` para mostrar las selecciones actuales
      // y `handleOptionChange` para manejar los cambios de selección
      // El botón "Confirmar" debe llamar a `handleConfirm` cuando se hace clic
      // Aquí puedes utilizar la librería de modal que elijas
      <div>
        <h2>Selecciona múltiples opciones</h2>
        <ul>
          {props.options.map((option) => (
            <li key={option}>
              <label>
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={handleConfirm}>Confirmar</button>
      </div>
    );
  }