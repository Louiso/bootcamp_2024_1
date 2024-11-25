// Messages Types
const INVITATION = "invitation";
const REMINDER = "reminder";
const CUSTOM = "custom";

const EMAIL = "email";
const SMS = "sms";
const WSP = "wsp";

export const messageTypes = [
  { id: INVITATION, label: "Invitacion" },
  { id: REMINDER, label: "Recordatorio de proceso" },
  { id: CUSTOM, label: "Personalizado" },
];

// Messages Channels
export const messageChannels = [
  { id: EMAIL, label: "Correo Electronico" },
  { id: SMS, label: "Mensaje de Texto" },
  { id: WSP, label: "WhatsApp" },
];

export const messagesByType = {
  [INVITATION]: {
    message:
      "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]",
    channelsMessages: {
      email: {
        showSubject: true,
        subject: "Invitacion a proceso",
      },
      other: {
        showSubject: false,
        subject: "",
      },
    },
  },
  [REMINDER]: {
    message:
      "Hola, [userName] nos gustaria recordarte que tines pendiente un proceso.Entra aquí para continuar: [Link]",
    channelsMessages: {
      email: {
        showSubject: true,
        subject: "Recordatorio en proceso",
      },
      other: {
        showSubject: false,
        subject: "",
      },
    },
  },
  [CUSTOM]: {
    message: "",
    channelsMessages: {
      email: {
        showSubject: true,
        subject: "",
      },
      other: {
        showSubject: false,
        subject: "",
      },
    },
  },
};
