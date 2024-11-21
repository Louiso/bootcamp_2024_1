export const PROCESO = {
  SELECCION_TIPO_MENSAJE: "SeleccionTipoMensaje",
  SELECCION_CANAL: "SeleccionCanal",
  CREACION_MENSAJE: "CreacionMensaje",
};
export const TIPO = {
  INIVITACION: "Invitacion",
  RECORDATORIO: "Recordatorio",
  PERSONALIZADO: "Personalizado",
};

export const TIPO_MENSAJE = [
  { id: 1, name: TIPO.INIVITACION },
  { id: 2, name: TIPO.RECORDATORIO },
  { id: 3, name: TIPO.PERSONALIZADO },
];

export const CANALES = [
  { id: 1, name: "SMS" },
  { id: 2, name: "Correo" },
  { id: 3, name: "WhatsApp" },
];

//{ label: "Asunto", name: "asunto", type: "text" },
export const CAMPOS_POR_CANAL = {
  sms: [{ label: "Mensaje", name: "mensaje", type: "textarea" }],
  correo: [
    { label: "Asunto", name: "asunto", type: "text" },
    { label: "Mensaje", name: "mensaje", type: "textarea" },
  ],
  whatsapp: [{ label: "Mensaje", name: "mensaje", type: "textarea" }],
};
