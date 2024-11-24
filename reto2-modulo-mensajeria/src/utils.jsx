import { Channel, MessageType } from "./constants";

export const generateInputData = ({ type, users, channels }) => {
  const data = [];

  users.forEach((user) => {
    channels.forEach((channel) => {
      let subject = "";
      let content = "";
      switch (type) {
        case MessageType.invitation:
          if (channel === Channel.email) subject = "Invitacion a proceso";
          content = `Hola, ${user} hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]`;
          break;
        case MessageType.reminder:
          if (channel === Channel.email) subject = "Recordatorio de proceso";
          content = `Hola, ${user} nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]`;
          break;
        default:
          break;
      }
      data.push({ user, channel, subject, content });
    });
  });

  return {
    type,
    data,
  };
};
