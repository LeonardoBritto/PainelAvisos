import Navbar from '../../layout/Navbar'
import Input from '../../form/Input'
import api from "../../../utils/api"
import './AlterarCliente.css'

import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {CssBaseline, Typography} from "@mui/material"

function AlterarCliente() {
    const [cliente, setCliente] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {cnpj} = useParams()

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
        console.log("Cliente", cliente)
        //handleSubmit(cliente)
    }

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Navbar pagina={cliente.nome}/>
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline/>
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                    Editar Cliente
                </Typography>
                <form onSubmit={submit} className='form_container'>
                <Input
                    text="Nome do Pet"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do pet"
                    handleOnChange={handleChange}
                    value={cliente.nome || ''}
                />
                <Input
                    text="Idade do Pet"
                    type="number"
                    name="age"
                    placeholder="Digite a idade do pet"
                    handleOnChange={handleChange}
                    value={cliente.cnpj || ''}
                />
                <Input
                    text="Peso do Pet"
                    type="number"
                    name="weight"
                    placeholder="Digite o peso do pet"
                    handleOnChange={handleChange}
                    value={cliente.login || ''}
                />
                <input type="submit" value='Salvar'/>
            </form>  
            </div>
        </div>
    )
}

export default AlterarCliente