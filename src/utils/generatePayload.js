export const generateRequestPayload = (data) => {
    const { sendTo, channel, messageTemplate } = data;
  
    return sendTo.map((user) => ({
      user: {
        id: user.id,
        name: user.name,
      },
      content: channel.map((ch) => {
        const template = messageTemplate.find((t) => t.channel === ch.value);
  
        return {
          channel: ch.value,
          ...(ch.value === "email" && { subject: template.subject }),
          message: template.message.replace("[userName]", user.name),
        };
      }),
    }));
  };
  