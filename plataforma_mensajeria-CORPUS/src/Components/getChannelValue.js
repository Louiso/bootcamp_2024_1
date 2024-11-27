export const getChannelValue = (tipoSelectCanal, indexChannel, tipoMensaje) => {
    const canalActual = tipoSelectCanal[indexChannel];

    const msjBase = {
        invitacion: {
            correoElectronico: {
                asunto: 'Invitación de proceso',
                mensaje: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra más información aquí: [LINK].'
            },
            smsYTexto: {
                asunto: '',
                mensaje: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra más información aquí: [LINK].'
            }
        },
        recordatorioDeProceso: {
            correoElectronico: {
                asunto: 'Recordatorio de proceso',
                mensaje: 'Hola, [userName] nos gustaría recordarte que tienes pendiente un proceso. Entra aquí para continuar [LINK].'
            },
            smsYTexto: {
                asunto: '',
                mensaje: 'Hola, [userName] nos gustaría recordarte que tienes pendiente un proceso. Entra aquí para continuar [LINK].'
            }
        },
        personalizado: {
            correoElectronico: {
                asunto: '',
                mensaje: ''
            },
            smsYTexto: {
                asunto: '',
                mensaje: ''
            }
        }
    };

    let asunto = 'Asunto no disponible';
    let mensaje = 'Mensaje no disponible';

    switch (tipoMensaje) {
        case 'invitacion':
            switch (canalActual) {
                case 'CorreoElectronico':
                    asunto = msjBase.invitacion.correoElectronico.asunto;
                    mensaje = msjBase.invitacion.correoElectronico.mensaje;
                    break;
                case 'MensajeTexto':
                case 'WhatsApp':
                    asunto = msjBase.invitacion.smsYTexto.asunto;
                    mensaje = msjBase.invitacion.smsYTexto.mensaje;
                    break;
                default:
            }
            break;
        case 'recordatorioDeProceso':
            switch (canalActual) {
                case 'CorreoElectronico':
                    asunto = msjBase.recordatorioDeProceso.correoElectronico.asunto;
                    mensaje = msjBase.recordatorioDeProceso.correoElectronico.mensaje;
                    break;
                case 'MensajeTexto':
                case 'WhatsApp':
                    asunto = msjBase.recordatorioDeProceso.smsYTexto.asunto;
                    mensaje = msjBase.recordatorioDeProceso.smsYTexto.mensaje;
                    break;
                default:
            }
            break;
        case 'personalizado':
            switch (canalActual) {
                case 'CorreoElectronico':
                    asunto = msjBase.personalizado.correoElectronico.asunto;
                    mensaje = msjBase.personalizado.correoElectronico.mensaje;
                    break;
                case 'MensajeTexto':
                case 'WhatsApp':
                    asunto = msjBase.personalizado.smsYTexto.asunto;
                    mensaje = msjBase.personalizado.smsYTexto.mensaje;
                    break;
                default:
            }
            break;
        default:
            console.log('Tipo de mensaje no válido:', tipoMensaje);
    }

    return { asunto, mensaje};
};
