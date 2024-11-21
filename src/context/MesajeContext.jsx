import { createContext, useReducer } from "react";
import { PROCESO } from "../constants/tipoMensaje";
import { PLANTILLAS } from "../constants/platillas";

const initialState = {
  tipoMensaje: "",
  canalesSeleccionados: [],
  contenidoCanales: {
    correo: {},
    sms: {},
    whatsapp: {},
  },
};

const mensajeReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  
  switch (actionType) {
    case PROCESO.SELECCION_TIPO_MENSAJE: {
      // Obtener la plantilla correspondiente al tipo de mensaje
      const plantillaTipo = PLANTILLAS[actionPayload.toLowerCase()] || PLANTILLAS.personalizado;
      
      // Crear un nuevo objeto contenidoCanales manteniendo las plantillas existentes
      const contenidoCanales = {
        ...state.contenidoCanales,
        // Solo actualizamos los canales que ya están seleccionados
        ...(state.canalesSeleccionados.length > 0
          ? state.canalesSeleccionados.reduce((acc, canal) => {
              acc[canal.toLowerCase()] = plantillaTipo[canal.toLowerCase()] || {};
              return acc;
            }, {})
          : {})
      };

      return {
        ...state,
        tipoMensaje: actionPayload,
        contenidoCanales,
      };
    }

    case PROCESO.SELECCION_CANAL: {
      const plantillaTipo = 
        PLANTILLAS[state.tipoMensaje.toLowerCase()] || PLANTILLAS.personalizado;
      
      // Actualizar contenido solo para los canales seleccionados
      const contenidoCanales = actionPayload.reduce((acc, canal) => {
        const canalLower = canal.toLowerCase();
        acc[canalLower] = plantillaTipo[canalLower] || state.contenidoCanales[canalLower] || {};
        return acc;
      }, {});

      return {
        ...state,
        canalesSeleccionados: actionPayload,
        contenidoCanales,
      };
    }

    case PROCESO.CREACION_MENSAJE:
      return {
        ...state,
        contenidoCanales: {
          ...state.contenidoCanales,
          ...actionPayload,
        },
      };

    default:
      return state;
  }
};

export const MensajeContext = createContext();

export const MensajeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mensajeReducer, initialState);

  return (
    <MensajeContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </MensajeContext.Provider>
  );
};