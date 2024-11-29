import { useState } from "react";

const usePaso = (inicial = 1) => {
  const [pasoActual, setPasoActual] = useState(inicial);

  const avanzarPaso = () => {
    if (pasoActual) {
      setPasoActual(pasoActual + 1);
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };
  return {
    pasoActual,
    avanzarPaso,
    retrocederPaso,
  };
};

export default usePaso;
