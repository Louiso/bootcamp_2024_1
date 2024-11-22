import { groupBy } from 'es-toolkit';

const templates = [
  {
    type: "invitation",
    value: 'Invitacion Correo',
    channel: 'email',
    subject: 'Invitacion a proceso',
    message: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra más información aquí: [Link]'
  },
  {
    type: "invitation",
    value: 'Invitacion SMS',
    channel: 'sms',
    message: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra más información aquí: [Link]'
  },
  {
    type: "invitation",
    value: 'Invitacion Whatsapp',
    channel: 'whatsapp',
    message: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra más información aquí: [Link]'
  },
  {
    type: "reminder",
    value: 'Recordatorio Correo',
    channel: 'email',
    subject: 'Recordatorio de proceso',
    message: 'Hola, [userName] nos gustaría recordarte que tienes pendiente un proceso. Entra aquí para continuar [Link]'
  },
  {
    type: "reminder",
    value: 'Recordatorio SMS',
    channel: 'sms',
    message: 'Hola, [userName] nos gustaría recordarte que tienes pendiente un proceso. Entra aquí para continuar [Link]'
  },
  {
    type: "reminder",
    value: 'Recordatorio Whatsapp',
    channel: 'whatsapp',
    message: 'Hola, [userName] nos gustaría recordarte que tienes pendiente un proceso. Entra aquí para continuar [Link]'
  },
  {
    type: "custom",
    value: 'Personalizado Correo',
    channel: 'email',
    subject: '',
    message: ''
  },
  {
    type: "custom",
    value: 'Personalizado SMS',
    channel: 'sms',
    message: ''
  },
  {
    type: "custom",
    value: 'Personalizado Whatsapp',
    channel: 'whatsapp',
    message: ''
  }
];


export const messageTemplates = groupBy(templates, item => item.channel);
