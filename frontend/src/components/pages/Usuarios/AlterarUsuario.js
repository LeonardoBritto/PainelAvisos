import Navbar from '../../layout/Navbar'
import api from "../../../utils/api"
import './AlterarUsuario.css'

import {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {CssBaseline} from "@mui/material"
import {ToastContainer, toast} from 'react-toastify'

function AlterarUsuario() {
    const [usuario, setUsuario] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {codigo} = useParams()
    const navigate = useNavigate()  

    useEffect(() => {
        api.get(`/usuarios/${codigo}`, {
            headers : {
                Authorization : `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setUsuario(response.data.usuario)
        })
    }, [token, codigo])

    const submit = (e) => {
        e.preventDefault()
        alterarUsuario(usuario)
    }

    function handleChange(e) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value})
    }

    async function alterarUsuario(usuario){
        let msgType = 'success'

        const data = await api.patch(`/usuarios/${codigo}`, usuario, {
            headers : {
                Authorization : `Bearer ${JSON.parse(token)}`
            }    
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        if (msgType === 'success'){
            toast.success(data.mensagem, {autoClose: 1500})
            setTimeout(() => {
                navigate('/usuarios')
            },1500)
        }
        else
            toast.error(data.mensagem, {autoClose: 1500})
    }

    return (
        <div>
            <Navbar pagina="Editar Usuario"/>
            <div>
                <CssBaseline/>
                <ToastContainer/>
                <div className='body'>
                    <form onSubmit={submit} className='form'>
                        <label htmlFor="nome">Nome:</label>
                        <input id="nome" type="text" name="nome" placeholder="Digite o Nome" value={usuario.nome} onChange={handleChange}/>    
                    
                        <label htmlFor="login">Login:</label>
                        <input id="login" type="text" name="login" placeholder="Digite o login"  value={usuario.login} onChange={handleChange}/> 

                        <label htmlFor="senha">Senha:</label>
                        <input id="senha" type="password" name="senha" placeholder="Digite a senha" onChange={handleChange}/>  

                        <label htmlFor="role">Selecione o nível:</label>
                        <select id="nivel" name="nivel" value={usuario.nivel} onChange={handleChange}>
                            <option value="">Selecione...</option>
                            <option value="1">Suporte</option>
                            <option value="0">Administrador</option>
                        </select>                      
                        
                        <button className=".button" type="submit">Alterar</button>
                    </form>
                </div>  
            </div>
        </div>
    )
}

export default AlterarUsuario