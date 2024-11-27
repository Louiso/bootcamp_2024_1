import { useState } from "react";
import { TipoMensajes } from "./TipoMensajes";
import { ProcessChannel } from './ProcessChannel';
import { Button, ContenedorBtn, Secction } from "../assets/Styles/App";
import { ContenedorInput, Form, Input } from "../assets/Styles/formStyle";

export const SeleccionCanales = () => {
    const [showForm, setShowForm] = useState(true);
    const [actionButton, setActionButton] = useState('');
    const [tipoSelectCanal, setTipoSelectCanal] = useState([]);

    const _handleActionButton = (e) => {
        e.preventDefault();
        const idSeleccionCanal = Array.from(document.querySelectorAll('input[name="seleccionCanal"]:checked')).map(id => id.id);
        if (idSeleccionCanal.length > 0) {
            setTipoSelectCanal(idSeleccionCanal);
            setActionButton(e.target.id);
            setShowForm(false);
        } else {
            alert('Necesita elegir un canal 😅.');
        }
    };



    return (
        <>
            {showForm ? (
                <Secction>
                    <Form>
                        <h1>Selección de canales</h1>
                        <ContenedorInput>
                            <label>
                                <Input type="checkbox" name="seleccionCanal" id="CorreoElectronico" /> Correo Electrónico
                            </label>
                        </ContenedorInput>
                        <ContenedorInput>
                            <label>
                                <Input type="checkbox" name="seleccionCanal" id="MensajeTexto"  /> Mensaje de texto
                            </label>
                        </ContenedorInput>
                        <ContenedorInput>
                            <label>
                                <Input type="checkbox" name="seleccionCanal" id="WhatsApp"  /> Whatsapp
                            </label>
                        </ContenedorInput>
                        <ContenedorBtn $JsCtEnd>
                            <Button $BtnColorText onClick={_handleActionButton} id="regresar">Regresar</Button>
                            <Button $ButtonColor $BtnColorText onClick={_handleActionButton} id="siguiente">Siguiente</Button>
                        </ContenedorBtn>
                    </Form>
                </Secction>
            ) : (
                actionButton === 'regresar' ? (                                                                                                                                     
                    <TipoMensajes prop={true} />
                ) : (
                    <ProcessChannel tipoSelectCanal={tipoSelectCanal} />
                )
            )}
        </>
    );
};
