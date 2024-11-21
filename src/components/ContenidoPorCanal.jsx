import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useMessage } from "../hooks/useMessage";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CAMPOS_POR_CANAL, PROCESO } from "../constants/tipoMensaje";

const ContenidoPorCanal = ({ avanzarPaso, retrocederPaso }) => {
  const { state, dispatch } = useMessage();
  const [contenido, setContenido] = useState(state.contenidoCanales);
  const [canalIndex, setCanalIndex] = useState(0);

  // se puede mejorar
  useEffect(() => {
    console.log("Contenido actual en useEffect:", state.contenidoCanales);
    if (!state.contenidoCanales) {
      setContenido(
        state.canalesSeleccionados.reduce((acc, canal) => {
          acc[canal.toLowerCase()] = { mensaje: "" };
          return acc;
        }, {}),
      );
    } else {
      setContenido(state.contenidoCanales);
    }
  }, [state.contenidoCanales, state.canalesSeleccionados]);

  const canales = state.canalesSeleccionados.map((canal) =>
    canal.toLowerCase(),
  );

  const CANAL_ACTUAL = canales[canalIndex]?.toLowerCase();

  const handleOnChange = ({ target: { value, name } }) => {
    const canal = CANAL_ACTUAL.toLowerCase();
    setContenido((prevState) => ({
      ...prevState,
      [canal]: {
        ...prevState[canal],
        [name]: value,
      },
    }));
  };
  const handleNext = () => {
    if (canalIndex < canales.length - 1) {
      setCanalIndex((prevState) => prevState + 1);
    } else {
      dispatch({
        type: PROCESO.CREACION_MENSAJE,
        payload: Object.keys(contenido).reduce((acc, key) => {
          acc[key.toLowerCase()] = contenido[key];
          return acc;
        }, {}),
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
  const isCorreoInvalid =
    CANAL_ACTUAL === "correo" &&
    (!contenido[CANAL_ACTUAL]?.asunto || !contenido[CANAL_ACTUAL]?.mensaje);
  return (
    <div className="w-full space-y-10">
      <Typography variant="h2" className="text-center">
        Contenido por Canal
      </Typography>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-5"></div>
      <Typography variant="h3" className="text-center">
        Contenido para {CANAL_ACTUAL}
      </Typography>
      {CAMPOS_POR_CANAL[CANAL_ACTUAL]?.map(({ label, name, type }, index) => (
        <div key={index} className="flex flex-col gap-5">
          <div className="mx-auto w-1/2">
            {type === "text" ? (
              <>
                <label htmlFor={name}>{label}</label>
                <Input
                  name={name}
                  onChange={handleOnChange}
                  value={contenido[CANAL_ACTUAL]?.[name] || ""}
                />
              </>
            ) : (
              <>
                <label htmlFor={name}>{label}</label>
                <Textarea
                  onChange={handleOnChange}
                  name={name}
                  value={contenido[CANAL_ACTUAL]?.[name] || ""}
                />
              </>
            )}
          </div>
        </div>
      ))}
      {}
      <div className="mx-auto mt-5 flex w-1/2 items-center justify-between">
        <Button
          className="flex items-center"
          disabled={canalIndex === 0}
          onClick={handlePrevious}
        >
          Atrás
          <MoveLeft className="ml-2 h-4 w-4" />
        </Button>
        <Button
          className="flex items-center"
          onClick={handleNext}
          disabled={isCorreoInvalid}
        >
          {canalIndex === canales.length - 1 ? "Finalizar" : "Siguiente"}
          <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ContenidoPorCanal;
