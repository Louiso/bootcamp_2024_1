import { useState } from "react";
import { useMensajeContext } from "../context/MensajeContext";
import { Button, Checkbox } from "@material-tailwind/react";

const SeleccionCanales = ({ avanzarPaso }) => {
  const { dispatch } = useMensajeContext();
  const [canales, setCanales] = useState([]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setCanales((prev) =>
      checked ? [...prev, value] : prev.filter((canal) => canal !== value)
    );
  };

  const handleNext = () => {
    dispatch({ type: "SET_CANALES_SELECCIONADOS", payload: canales });
    avanzarPaso();
  };

  return (
    <div>
      <h2 className="text-md text-gray-800 mt-2 opacity-75">
        Selecciona los canales
      </h2>
      <div className="flex flex-col gap-5 mt-5">
        <label>
          <Checkbox
            type="checkbox"
            value="correo"
            onChange={handleChange}
            className="mr-2"
          />
          Correo Electrónico
        </label>
        <label>
          <Checkbox
            type="checkbox"
            value="mensaje"
            onChange={handleChange}
            className="mr-2"
          />
          Mensaje de Texto
        </label>
        <label>
          <Checkbox
            type="checkbox"
            value="whatsapp"
            onChange={handleChange}
            className="mr-2"
          />
          WhatsApp
        </label>
        <Button
          onClick={handleNext}
          disabled={canales.length === 0}
          className="but"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default SeleccionCanales;
