
export const MESSAGES = {
    INVITATION: {
        MAIL: {
            subject: "Invitacion a proceso",
            message: "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]"
        },
        TEXTMESSAGE: {
            message: "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]"
        },
        WHATSAPP: {
            message: "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]"
        }
    },
    REMINDER: {
        MAIL: {
            subject: "Recordatorio de proceso",
            message: "Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]"
        },
        TEXTMESSAGE: {
            message: "Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso.  Entra aqui para continuar [Link]"
        },
        WHATSAPP: {
            message: "Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso.  Entra aqui para continuar [Link]"
        }
    }
}


export const typeOfMessages = [
    {
        index: "1",
        type: "INVITATION",
        text: "Invitación",
    },
    {
        index: "2",
        type: "REMINDER",
        text: "Recordatorio de proceso"
    },
    {
        index: "3",
        type: "CUSTOM",
        text: "Personalizado"
    }
]

export const messagesChannels = [
    {
        index: "0",
        type: "MAIL",
        text: "Correo Electónico"
    },
    {
        index: "1",
        type: "TEXTMESSAGE",
        text: "Mensaje de Texto"
    },
    {
        index: "2",
        type: "WHATSAPP",
        text: "Whatsapp"
    }
]
