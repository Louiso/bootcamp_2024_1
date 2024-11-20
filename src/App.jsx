import { useState } from "react";
import { useMensajeContext } from "./context/MensajeContext";
import SeleccionTipoMensaje from "./components/SeleccionTipoMensaje";
import SeleccionCanales from "./components/SeleccionCanales ";
import ContenidoPorCanal from "./components/ContenidoPorCanal ";

export default function App() {
  const { state } = useMensajeContext();
  const [pasoActual, setPasoActual] = useState(1);
  

  const avanzarPaso = () => {
    setPasoActual((prev) => prev + 1);
  };

  const retrocederPaso = () => {
    setPasoActual((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="relative grid place-content-center min-h-[100vh] w-screen p-8">
      <h1 className="text-3xl text-center font-bold">Generador de Mensajes</h1>
      {pasoActual === 1 && <SeleccionTipoMensaje avanzarPaso={avanzarPaso} />}
      {pasoActual === 2 && <SeleccionCanales avanzarPaso={avanzarPaso} />}
      {pasoActual === 3 && (
        <ContenidoPorCanal
          avanzarPaso={avanzarPaso}
          retrocederPaso={retrocederPaso}
        />
      )}
      {pasoActual === 4 && (
        <div>
          <h2>Resumen del Mensaje</h2>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
