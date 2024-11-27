import { useContext, useState } from "react"
import { App } from "../App";
import {SeleccionCanales} from './SeleccionCanales'
import {ContenedorBtn,Secction,Button} from '../assets/Styles/App'
import { ContenedorInput, Form, Input } from "../assets/Styles/formStyle";
import { UserContext } from "../contexts/UserContextProvider";


export const TipoMensajes = (prop) => {

    const [stateBtn, setStateBtn] = useState('')
    const [showForm, setShowForm] = useState(prop)
    // const [tipoMensaje, setTipoMensaje] = useState('');

    const { tipoMensaje, setTipoMensaje } = useContext(UserContext);


    
    const _handleOnClickBtns = (e) => {

        const inputChecked = document.querySelector('input[name="TipoMensaje"]:checked');

        if(inputChecked){
            setTipoMensaje(inputChecked.id);
            setStateBtn(e.target.id);
            setShowForm(!prop)
        }else if(e.target.id === 'cancelar'){
            setStateBtn('cancelar');
            setShowForm(!prop)
        }else{
            alert('Por favor, selecciona un tipo de mensaje antes de continuar c:')
        }

    }

    const _handleOnSumitTipoMensaje = (e) => {
        e.preventDefault();
    }

    return (
        <>

            {
                showForm ? (
                    <Secction>
                        <Form onSubmit={_handleOnSumitTipoMensaje}>
                        <h1>Seleccion de tipo de mensaje</h1>
                            <div>
                                <ContenedorInput>
                                    <label>
                                            <Input className="input" type="radio" name="TipoMensaje" id="invitacion" />Invitación
                                    </label>
                                </ContenedorInput>

                                <ContenedorInput>
                                    <label>
                                        <Input className="input" type="radio" name="TipoMensaje" id="recordatorioDeProceso" />Recordatorio de proceso
                                    </label> 
                                </ContenedorInput>
                                
                                <ContenedorInput>
                                    <label>
                                        <Input className="input" type="radio" name="TipoMensaje" id="personalizado" />Personalizado
                                    </label>
                                </ContenedorInput>
                            </div>
                            
                            <ContenedorBtn $JsCtEnd>
                                <Button $BtnColorText onClick={_handleOnClickBtns} id="cancelar">Cancelar</Button>
                                <Button $ButtonColor $BtnColorText onClick={_handleOnClickBtns} id="siguiente">Siguiente</Button>
                            </ContenedorBtn>
                        </Form>
                    </Secction>
                ) : (
                    stateBtn === 'siguiente' ? (


                            <SeleccionCanales />

                    ) : (
                        <App/>
                    )
                )
            }
        </>
    )
}
