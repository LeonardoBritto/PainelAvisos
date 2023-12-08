import Navbar from '../../layout/Navbar'
import api from "../../../utils/api"
import './AlterarCliente.css'

import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {CssBaseline} from "@mui/material"
import {ToastContainer, toast} from 'react-toastify'

function CadastrarCliente() {
    const [cliente, setCliente] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        inserirCliente(cliente)
    }

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value})
    }

    async function inserirCliente(cliente){
        let msgType = 'success'

        const data = await api.post(`/clientes/inserir`, cliente, {
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
    }

    return (
        <div>
            <Navbar pagina="Cadastrar Cliente"/>
            <div>
                <CssBaseline/>
                <ToastContainer/>
                <div className='body'>
                    <form onSubmit={submit} className='form'>
                        <label for="cnpj">CNPJ:</label>
                        <input type="text" id="cnpj" name="cnpj" pattern="[0-9]{14}" placeholder="Digite o CNPJ" required  onChange={handleChange} maxLength={14}/>    
                    
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite o nome" required  onChange={handleChange}/>

                        <label for="usuario">Usuário:</label>
                        <input type="email" id="usuario" name="usuario" placeholder="Digite o e-mail" required  onChange={handleChange}/>

                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite a senha" onChange={handleChange}/>

                        <label for="ip">IP de Acesso:</label>
                        <input type="text" id="ip" name="ipacesso" placeholder="Digite o IP de acesso" onChange={handleChange}/>

                        <button className=".button" type="submit">Salvar</button>
                    </form>
                </div>  
            </div>
        </div>
    )
}

export default CadastrarCliente