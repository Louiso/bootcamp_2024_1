import { useContext, useState } from 'react';
import { CorreoElectronico } from './chats/CorreoElectronico';
import { MensajeTexto } from './chats/MensajeTexto';
import { WhatsApp } from './chats/WhatsApp';
import { ButtonContainer, ContentBtnChanelN } from '../assets/Styles/ChatsStyle';
import { Button } from '../assets/Styles/App';
import { SeleccionCanales } from './SeleccionCanales';
import { UserContext } from '../contexts/UserContextProvider';
import { getChannelValue } from './getChannelValue';
import { App } from '../App';

export const ProcessChannel = ({ tipoSelectCanal }) => {
    
    const {tipoMensaje} = useContext(UserContext)
    const [indexChannel, setIndexChannel] = useState(0);
    const [irselectCanales, setIrselectCanales] = useState(false);
    const [finilizar, setFinilizar] = useState(false)

    const renderChannel = () => {
        const { asunto, mensaje } = getChannelValue(tipoSelectCanal, indexChannel, tipoMensaje);
        switch (tipoSelectCanal[indexChannel]) {
            case 'CorreoElectronico':
                return <CorreoElectronico  asunto={asunto} mensaje={mensaje}/>;
            case 'MensajeTexto':
                return <MensajeTexto  asunto={asunto} mensaje={mensaje}/>;
            case 'WhatsApp':
                return <WhatsApp asunto={asunto} mensaje={mensaje} />;
            default:
                return <p>No hay canales seleccionados.</p>;
        }
    };



    const _handlePreviousChannel = () =>{
        if(indexChannel > 0){
            setIndexChannel(indexChannel - 1)
        }else{
            setIrselectCanales(true)
        }
    }

    const _handleNextChannel = () =>{
        if(indexChannel  < tipoSelectCanal.length - 1){
            setIndexChannel( indexChannel + 1)
        }
    }


    const _handleFinishChannel = () =>{
        alert('Mensaje enviado con exito :D')
        setFinilizar(true)
    }

if(finilizar){
    return <App/>
}
if(irselectCanales || finilizar){
    return <SeleccionCanales></SeleccionCanales>
}
    
    return (
        <>
        {
                    <ContentBtnChanelN>
                        <div>{renderChannel()}</div>
                            <ButtonContainer>
                                <Button id='regresar' 
                                onClick={_handlePreviousChannel}
                                $BtnColorText>Regresar
                                </Button>

                                {
                                    tipoSelectCanal.length - 1 === indexChannel ? (
                                        <Button id='siguiente'
                                        $ButtonColor
                                        $BtnColorText
                                        onClick={_handleFinishChannel}>Finalizar
                                        </Button>
                                    ) : (
                                        <Button id='siguiente'
                                        $ButtonColor
                                        $BtnColorText
                                        onClick={_handleNextChannel}>Continuar
                                        </Button>
                                    )
                                }
                            </ButtonContainer>
                    </ContentBtnChanelN>
        }
        </>
    );
};
