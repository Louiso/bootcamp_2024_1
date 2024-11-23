import {keyBy, groupBy} from 'es-toolkit'
export const usersDefault = [
  {
    id: 1,
    name: "Roly Ari",
  },
  {
    id: 2,
    name: "Luis Perez",
  },
  {
    id: 3,
    name: "Javier Lujan",
  },
  {
    id: 4,
    name: "Jesús Carrión",
  },
];

export const typeMessage = {
  Invitacion: 'INVITACION',
  Recordatorio: 'RECORDATORIO',
  Personalizado: 'PERSONALIZADO'
}

export const channels = {
  Email: 'EMAIL',
  Sms: 'SMS',
  Whatsapp: 'WHATSAPP'
}

export const typeMessageConfig = [
  {
    typeMessage: typeMessage.Invitacion,
    label: "Invitación"
  },
  {
    typeMessage: typeMessage.Recordatorio,
    label: "Recordario de proceso"
  },
  {
    typeMessage: typeMessage.Personalizado,
    label: "Personalizado"
  }
]

export const channelsConfig = [
  {
    channel: channels.Email,
    label: "Correo Electrónico"
  },
  {
    channel: channels.Sms,
    label: "Mensaje de Texto"
  },
  {
    channel: channels.Whatsapp,
    label: "Whatsapp"
  }
]

export const templateMessages = [
  {
    typeMessage:typeMessage.Invitacion,
    channel: channels.Email,
    asunto: 'Invitacion a proceso',
    mensaje: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]'
  },
  {
    typeMessage: typeMessage.Invitacion,
    channel: channels.Sms,
    mensaje: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]'
  },
  {
    typeMessage: typeMessage.Invitacion,
    channel: channels.Whatsapp,
    mensaje: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]'
  },
  {
    typeMessage:typeMessage.Recordatorio,
    channel: channels.Email,
    asunto: 'Recordatorio de proceso',
    mensaje: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]'
  },
  {
    typeMessage: typeMessage.Recordatorio,
    channel: channels.Sms,
    mensaje: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso.  Entra aqui para continuar [Link]'
  },
  {
    typeMessage: typeMessage.Recordatorio,
    channel: channels.Whatsapp,
    mensaje: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso.  Entra aqui para continuar [Link]'
  },
  {
    typeMessage:typeMessage.Personalizado,
    channel: channels.Email,
    asunto: '',
    mensaje: ''
  },
  {
    typeMessage: typeMessage.Personalizado,
    channel: channels.Sms,
    mensaje: ''
  },
  {
    typeMessage: typeMessage.Personalizado,
    channel: channels.Whatsapp,
    mensaje: ''
  },
]
export const typeMessageConfigByTypeMessage = keyBy(
  typeMessageConfig,
  ({ typeMessage }) => typeMessage
);

export const templateGroupByTypeMessage = groupBy(templateMessages, item => item.typeMessage);
