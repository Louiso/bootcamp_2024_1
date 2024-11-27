
import { useState } from "react";
import { ContenedorInputChats, FormChats, InputsChats, SecctionChats, StyledTextArea } from "../../assets/Styles/ChatsStyle";

export const CorreoElectronico = ({asunto ='',mensaje =''}) => {


    const [asuntoEditable, setAsuntoEditable] = useState(asunto);
    const [mensajeEditable, setMensajeEditable] = useState(mensaje);

    const _handleAsuntoEditable = (e) =>{
        setAsuntoEditable(e.target.value);
    }

    const _handleMensajeEditable = (e) => {
        setMensajeEditable(e.target.value);

    }
    return (
        <SecctionChats>
            <FormChats>
                <h1>Correo Electrónico</h1>

                <div>
                    <label>
                        Asunto
                        <ContenedorInputChats>
                            <InputsChats 
                                type="text" 
                                onChange={_handleAsuntoEditable}
                                value={asuntoEditable}
                                placeholder='Escriba aqui...'
                            />
                        </ContenedorInputChats>
                    </label>
                </div>

                <div>
                    <label>
                        Mensaje
                        <ContenedorInputChats>
                            <StyledTextArea 
                                rows="5" 
                                onChange={_handleMensajeEditable}
                                value={mensajeEditable}
                                placeholder='Escriba aqui...'
                            />
                        </ContenedorInputChats>
                    </label>
                </div>
            </FormChats>
        </SecctionChats>
    );
};
