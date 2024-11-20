import { Checkbox } from "@material-tailwind/react";
import { useMensajeContext } from "../context/MensajeContext";

const SeleccionTipoMensaje = ({ avanzarPaso }) => {
  const { dispatch } = useMensajeContext();

  const handleChange = (e) => {
    dispatch({ type: "SET_TIPO_MENSAJE", payload: e.target.value });
    avanzarPaso();
  };
  return (
    <div>
      <h2 className="text-md text-gray-800 mt-2 opacity-75">
        Selecciona el tipo de mensaje
      </h2>
      <div className="flex flex-col gap-5 mt-5">
        <label>
          <Checkbox
            type="radio"
            name="tipoMensaje"
            value="invitación"
            onChange={handleChange}
            className="mr-2"
          />
          Invitación
        </label>
        <label>
          <Checkbox
            type="radio"
            name="tipoMensaje"
            value="recordatorio"
            onChange={handleChange}
            className="mr-2"
          />
          Recordatorio
        </label>
        <label>
          <Checkbox
            type="radio"
            name="tipoMensaje"
            value="personalizado"
            onChange={handleChange}
            className="mr-2"
          />
          Personalizado
        </label>
      </div>
    </div>
  );
};

export default SeleccionTipoMensaje;
