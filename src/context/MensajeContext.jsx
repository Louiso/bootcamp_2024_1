import { createContext, useReducer, useContext } from "react";
import { PLANTILLAS } from "../base/pantilla";

const initialState = {
  tipoMensaje: "", // invitación, recordatorio, personalizado
  canalesSeleccionados: [], // ["correo", "mensaje text (numero telefono)","whatsapp"]
  contenidoCanales: [], // [{ canal: "correo", contenido: { asunto: "", mensaje: "" } }]
};

// Reducer para manejar las acciones
const mensajeReducer = (state, action) => {
  switch (action.type) {
    case "SET_TIPO_MENSAJE":
      const tipoMensaje = action.payload;
      const contenidoInicial =
        tipoMensaje === "personalizado" ? {} : PLANTILLAS[tipoMensaje]; // Cargar plantillas predefinidas

      return {
        ...state,
        tipoMensaje,
        contenidoCanales: contenidoInicial,
      };
    case "SET_CANALES_SELECCIONADOS":
      return { ...state, canalesSeleccionados: action.payload };
    case "SET_CONTENIDO_CANALES":
      return { ...state, contenidoCanales: action.payload };
    default:
      return state;
  }
};

export const MensajeContext = createContext(initialState);

export const MensajeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mensajeReducer, initialState);

  return (
    <MensajeContext.Provider value={{ state, dispatch }}>
      {children}
    </MensajeContext.Provider>
  );
};

export const useMensajeContext = () => useContext(MensajeContext);
