import { useState } from "react";
import { useMensajeContext } from "../context/MensajeContext";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { PLANTILLAS } from "../base/pantilla";

const ContenidoPorCanal = ({ avanzarPaso, retrocederPaso }) => {
  const { state, dispatch } = useMensajeContext();
  const [contenido, setContenido] = useState(() =>
    state.tipoMensaje !== "personalizado" ? state.contenidoCanales : {}
  );
  const [canalIndex, setCanalIndex] = useState(0);

  const canales = state.canalesSeleccionados;
  const canalActual = canales[canalIndex];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContenido((prev) => ({
      ...prev,
      [canalActual]: {
        ...prev[canalActual],
        [name]: value,
      },
    }));
  };

  const canalActualContenido =
    contenido[canalActual] ||
    (state.tipoMensaje !== "personalizado"
      ? PLANTILLAS[state.tipoMensaje][canalActual]
      : {});

  const handleNext = () => {
    if (canalIndex < canales.length - 1) {
      setCanalIndex((prev) => prev + 1);
    } else {
      dispatch({
        type: "SET_CONTENIDO_CANALES",
        payload: Object.entries(contenido).map(([canal, contenido]) => ({
          canal,
          contenido,
        })),
      });
      avanzarPaso();
    }
  };

  const handlePrevious = () => {
    if (canalIndex > 0) {
      setCanalIndex((prev) => prev - 1);
    } else {
      retrocederPaso();
    }
  };

  return (
    <div>
      <h2 className="text-md text-gray-800 mt-2 opacity-75">
        Contenido para {canalActual}
      </h2>
      {canalActual === "correo" && (
        <div className="flex flex-col gap-4 mt-4">
          <label>
            Asunto:
            <Input
              type="text"
              name="asunto"
              onChange={handleInputChange}
              value={canalActualContenido.asunto || ""}
              className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </label>
          <label>
            Mensaje:
            <Textarea
              name="mensaje"
              onChange={handleInputChange}
              value={canalActualContenido.mensaje || ""}
            />
          </label>
        </div>
      )}
      {canalActual === "mensaje" && (
        <div className="">
          <label className="flex flex-col mt-5 gap-5 mb-3">
            <span>Mensaje:</span>
            <Textarea
              name="mensaje"
              onChange={handleInputChange}
              value={contenido[canalActual]?.mensaje || ""}
            />
          </label>
        </div>
      )}
      {canalActual === "whatsapp" && (
        <div className="mb-5 ">
          <label className="flex flex-col gap-5 mt-5">
            <span>Mensaje:</span>
            <Textarea
              name="mensaje"
              onChange={handleInputChange}
              value={contenido[canalActual]?.mensaje || ""}
            />
          </label>
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <Button onClick={handlePrevious} disabled={canalIndex === 0}>
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            canalActual === "correo" &&
            (!contenido[canalActual]?.asunto ||
              !contenido[canalActual]?.mensaje)
          }
        >
          {canalIndex === canales.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
};

export default ContenidoPorCanal;
