import ClienteForm from "../../form/ClienteForm"
import Navbar from '../../layout/Navbar'
import api from "../../../utils/api"

import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"

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

    async function editarCliente(cliente){
        navigate('/clientes')
    }

    return (
        <div>
            <Navbar pagina={cliente.nome}/>
            <ClienteForm handleSubmit={editarCliente} ClienteData={cliente}/>
        </div>
    )
}

export default AlterarCliente