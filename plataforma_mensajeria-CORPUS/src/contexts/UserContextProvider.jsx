import { createContext, useState } from 'react'

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {

    const [tipoMensaje, setTipoMensaje] = useState('');



    return (
        <UserContext.Provider value={{ tipoMensaje, setTipoMensaje }}>
            {children}
        </UserContext.Provider>
    )
}