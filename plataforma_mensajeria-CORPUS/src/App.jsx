import { useState } from 'react'
import {Secction, Button, ContenedorBtn} from './assets/Styles/App'
import { TipoMensajes } from './Components/TipoMensajes'
import { UserContextProvider } from './contexts/UserContextProvider';



export const App = () => {
    const [showTipoMensajes, setShowTipoMensajes] = useState(false);

    const _handleOnchangeMain = () =>{
        setShowTipoMensajes(true);
    }

    return (

    <UserContextProvider>
            {
                showTipoMensajes ? (
                    <TipoMensajes/>
                ) : (
                    <Secction $SectionMain >
                        <div>
                            <h1>La mejor plataforma de mensajeria</h1>
                            <ContenedorBtn >
                                <Button $ButtonColor $BtnColorText onClick={_handleOnchangeMain} $sectionBtn>Comenzar...</Button>
                            </ContenedorBtn>
                        </div>
                    </Secction>
                )
            }
    </UserContextProvider>
    )
}
