import Navbar from '../../layout/Navbar'
import api from "../../../utils/api"
import './AlterarCliente.css'

import {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {CssBaseline} from "@mui/material"
import {ToastContainer, toast} from 'react-toastify'

function AlterarCliente() {
    const [cliente, setCliente] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {cnpj} = useParams()
    const navigate = useNavigate()  

    useEffect(() => {
        api.get(`/clientes/${cnpj}`, {
            headers : {
                Authorization : `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setCliente(response.data.cliente)
        })
    }, [token, cnpj])

    const submit = (e) => {
        e.preventDefault()
        alterarCliente(cliente)
    }

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value})
    }

    async function alterarCliente(cliente){
        let msgType = 'success'

        const data = await api.patch(`/clientes/${cnpj}`, cliente, {
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
                navigate('/clientes')
            },1500)
        }
        else
            toast.error(data.mensagem, {autoClose: 1500})
        console.log(cliente)
    }

    return (
        <div>
            <Navbar pagina="Editar Cliente"/>
            <div>
                <CssBaseline/>
                <ToastContainer/>
                <div className='body'>
                    <form onSubmit={submit} className='form'>
                        <label for="cnpj">CNPJ:</label>
                        <input type="text" id="cnpj" name="cnpj" pattern="[0-9]{14}" placeholder="Digite o CNPJ" required value={cliente.cnpj} onChange={handleChange} maxLength={14}/>    
                    
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite o nome" required value={cliente.nome} onChange={handleChange}/>

                        <label for="usuario">Usuário:</label>
                        <input type="email" id="usuario" name="usuario" placeholder="Digite o e-mail" required value={cliente.usuario} onChange={handleChange}/>

                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite a senha" onChange={handleChange}/>

                        <label for="ip">IP Primário:</label>
                        <input type="text" id="ip" name="ipacesso" placeholder="Digite o IP Primário" value={cliente.ipacesso} onChange={handleChange}/>

                        <label for="ip">IP Secundario:</label>
                        <input type="text" id="ip2" name="ipacesso2" placeholder="Digite o IP Secundario" value={cliente.ipacesso2} onChange={handleChange}/>

                        <button className=".button" type="submit">Alterar</button>
                    </form>
                </div>  
            </div>
        </div>
    )
}

export default AlterarCliente