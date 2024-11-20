export const MESSAGE_TYPES = {
  INVITATION: 'invitation',
  REMINDER: 'reminder',
  CUSTOM: 'custom'
};

export const CHANNEL_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp'
};

export const MESSAGE_TYPE_LABELS = {
  [MESSAGE_TYPES.INVITATION]: 'Invitación',
  [MESSAGE_TYPES.REMINDER]: 'Recordatorio de proceso',
  [MESSAGE_TYPES.CUSTOM]: 'Personalizado'
};

export const CHANNEL_LABELS = {
  [CHANNEL_TYPES.EMAIL]: 'Correo Electrónico',
  [CHANNEL_TYPES.SMS]: 'Mensaje de Texto',
  [CHANNEL_TYPES.WHATSAPP]: 'WhatsApp'
};

export const MESSAGE_TEMPLATES = {
  [MESSAGE_TYPES.INVITATION]: {
    [CHANNEL_TYPES.EMAIL]: {
      subject: 'Invitacion a proceso',
      body: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]'
    },
    [CHANNEL_TYPES.SMS]: {
      body: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]'
    },
    [CHANNEL_TYPES.WHATSAPP]: {
      body: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]'
    }
  },
  [MESSAGE_TYPES.REMINDER]: {
    [CHANNEL_TYPES.EMAIL]: {
      subject: 'Recordatorio de proceso',
      body: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]'
    },
    [CHANNEL_TYPES.SMS]: {
      body: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]'
    },
    [CHANNEL_TYPES.WHATSAPP]: {
      body: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]'
    }
  },
  [MESSAGE_TYPES.CUSTOM]: {
    [CHANNEL_TYPES.EMAIL]: {
      subject: '',
      body: ''
    },
    [CHANNEL_TYPES.SMS]: {
      body: ''
    },
    [CHANNEL_TYPES.WHATSAPP]: {
      body: ''
    }
  }
};

export const ORDERED_CHANNELS = [
  CHANNEL_TYPES.EMAIL,
  CHANNEL_TYPES.SMS,
  CHANNEL_TYPES.WHATSAPP
];