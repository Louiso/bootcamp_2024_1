import { Typography } from "@material-tailwind/react";
import { useMessage } from "../hooks/useMessage";
import Confetti from "react-confetti";

const ResumenMensaje = () => {
  const { state } = useMessage();
  // Obtiene el ancho y alto de la ventana.
  const { innerWidth: width, innerHeight: height } = window;

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={500}
      />
      <div className="flex flex-col items-center justify-center gap-5">
        <Typography variant="h3">Resumen del Mensaje</Typography>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </>
  );
};

export default ResumenMensaje;
