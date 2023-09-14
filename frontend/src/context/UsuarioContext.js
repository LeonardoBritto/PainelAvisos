import {createContext} from "react"

import useAuth from "../hooks/useAuth"

const Context = createContext()

function UsuarioProvider({children}) {
    const {authenticated, inserir, login, logout, adm} = useAuth() 
    
    return(
        <Context.Provider value={{authenticated, inserir, login, logout, adm}}>
            {children}
        </Context.Provider>
    )
}

export {Context, UsuarioProvider}