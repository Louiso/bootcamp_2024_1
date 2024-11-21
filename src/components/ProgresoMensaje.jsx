import usePaso from "../hooks/usePaso ";
import ContenidoPorCanal from "./ContenidoPorCanal";
import ResumenMensaje from "./ResumenMensaje ";
import SeleccionCanales from "./SeleccionCanales";
import { SeleccionTipoMensaje } from "./SeleccionTipoMensaje ";

const ProgresoMensaje = () => {
  const { pasoActual, avanzarPaso, retrocederPaso } = usePaso();

  switch (pasoActual) {
    case 1:
      return <SeleccionTipoMensaje avanzarPaso={avanzarPaso} />;
    case 2:
      return <SeleccionCanales avanzarPaso={avanzarPaso} />;
    case 3:
      return (
        <ContenidoPorCanal
          avanzarPaso={avanzarPaso}
          retrocederPaso={retrocederPaso}
        />
      );
    case 4:
      return <ResumenMensaje />;
    default:
      return null;
  }
};

export default ProgresoMensaje;
