import { Button, Radio, Typography } from "@material-tailwind/react";
import { MoveRight } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { PROCESO, TIPO_MENSAJE } from "../constants/tipoMensaje";
import { useMessage } from "../hooks/useMessage";

export function SeleccionTipoMensaje({ avanzarPaso }) {
  const { dispatch } = useMessage();

  const [selectedId, setSelectedId] = useState(null);

  const handleSelect =
    (id) =>
    ({ target: { value } }) => {
      setSelectedId(id);
      dispatch({
        type: PROCESO.SELECCION_TIPO_MENSAJE,
        payload: value,
      });
    };

  return (
    <div className="w-full space-y-10">
      <Typography variant="h2" className="text-center">
        Selecciona el tipo de mensaje
      </Typography>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-5">
        {TIPO_MENSAJE.map(({ id, name }) => (
          <div
            key={id}
            className={cn(
              "mx-auto w-1/2 cursor-pointer rounded-lg border-2 p-2",
              selectedId === id && "border-green-500",
            )}
          >
            <Radio
              value={name}
              color="green"
              checked={selectedId === id}
              label={name}
              onChange={handleSelect(id)}
            />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-5 flex w-1/2 items-center justify-between">
        <Button
          disabled={selectedId === null}
          onClick={() => setSelectedId(null)}
          variant="text"
        >
          Quitar eleccion
        </Button>
        <Button
          disabled={selectedId === null}
          className="flex items-center"
          onClick={() => avanzarPaso()}
        >
          Siguiente
          <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
