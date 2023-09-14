import api from "../utils/api"

import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const [adm, setAdm] = useState(true)

    const navigate = useNavigate() 

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function inserir(usuario) {
        try {
            const data = await api.post('usuarios/inserir', usuario).then((response) => {
                return response.data
            })
            console.log("Arquivo useAuth retornando registro. Dados: ", data)
        } catch (error) {
            console.log("Arquivo useAuth retornando registro. Erro: ", error.response.data)
        }
    }

    async function authUser(data){
        setAuthenticated(true)

        setAdm(data.nivel === 0)
        
        toast.success(data.mensagem, {autoClose: 1500})

        localStorage.setItem('token', JSON.stringify(data.token))

        setTimeout(() => {
            navigate('/avisos') 
        }, 2000);        
    }

    async function login(usuario){
        try {
            const data = await api.post('usuarios/login', usuario).then((response) => {
                return response.data
            })            
            await authUser(data)
        } catch (error) {
            toast.error(error.response.data.mensagem, {autoClose: 2000})
        }
        
    }

    function logout(){
        toast.success('Logout realizado com sucesso!', {autoClose: 1500})

        setAuthenticated(false)
       
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined

        setTimeout(() => {
            navigate('/') 
        }, 2000);
    }

    return {authenticated, inserir, login, logout, adm}
}