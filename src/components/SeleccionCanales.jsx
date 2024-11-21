import { Button, Checkbox, Typography } from "@material-tailwind/react";
import { CANALES, PROCESO } from "../constants/tipoMensaje";
import { cn } from "../lib/utils";
import { MoveRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutgoingMail, MdOutlineTextsms } from "react-icons/md";
import { useState } from "react";
import { useMessage } from "../hooks/useMessage";

const icons = {
  SMS: <MdOutlineTextsms />,
  Correo: <MdOutgoingMail />,
  WhatsApp: <FaWhatsapp />,
};

const SeleccionCanales = ({ avanzarPaso }) => {
  const [canales, setCanales] = useState([]);
  const { dispatch } = useMessage();

  const handleChange = ({ target: { value, checked } }) => {
    setCanales((prevState) => {
      if (checked) {
        return [...prevState, value];
      }
      return prevState.filter((canal) => canal !== value);
    });
  };

  const handleNext = () => {
    dispatch({
      type: PROCESO.SELECCION_CANAL,
      payload: canales, // Solo los canales seleccionados se actualizan aquí
    });
    avanzarPaso();
  };

  return (
    <div className="w-full space-y-10">
      <Typography variant="h2" className="text-center">
        Selecciona los canales
      </Typography>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-5">
        {CANALES.map(({ id, name }) => (
          <div
            key={id}
            className={cn(
              "mx-auto w-1/2 cursor-pointer rounded-lg border-2 p-2",
            )}
          >
            <Checkbox
              value={name}
              icon={icons[name]}
              label={name}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-5 flex w-1/2 items-center justify-end">
        <Button className="flex items-center" onClick={handleNext}>
          Siguiente
          <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SeleccionCanales;
