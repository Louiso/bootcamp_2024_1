export const PLANTILLAS = {
  invitacion: {
    sms: {
      mensaje:
        "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]",
    },
    correo: {
      asunto: "Invitacion a proceso",
      mensaje:
        "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]",
    },
    whatsapp: {
      mensaje:
        "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]",
    },
  },
  recordatorio: {
    sms: {
      mensaje:
        "Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]",
    },
    correo: {
      asunto: "Recordatorio de proceso",
      mensaje:
        "Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]",
    },
    whatsapp: {
      mensaje:
        "Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]",
    },
  },
  personalizado: {
    sms: { mensaje: "" },
    correo: { asunto: "", mensaje: "" },
    whatsapp: { mensaje: "" },
  },
};
