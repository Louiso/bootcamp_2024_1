export const MessageType = {
    invitation: "Invitation",
    reminder: "Reminder",
    custom: "Custom"
}

export const Channel = {
    email: "Email",
    text: "Text",
    whastapp: "Whatsapp"
}

export const appConfigs = [
    {
        step: 1,
        title: "Usuarios"
    },
    {
        step: 2,
        title: "Seleccion de tipo de mensaje"
    },
    {
        step: 3,
        title: "Seleccion de canales"
    }
]

export const messageConfigs = [
    {
        channel: Channel.email,
        title: "Correo electrónico"
    },
    {
        channel: Channel.text,
        title: "Mensaje de texto"
    },
    {
        channel: Channel.whastapp,
        title: "Whatsapp"
    }
]