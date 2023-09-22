import Navbar from "../../layout/Navbar"
import api from "../../../utils/api"

import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {format} from 'date-fns'

function InterLog(){
    const [logs, setLogs] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {cnpj} = useParams()

    useEffect(() => {
        api.get(`centralinterlog/${cnpj}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setLogs(response.data.avisos)
        })
    },[cnpj, token])

    const formAvisos = logs.map((log) => ({
        ...log,
        data_atualizacao: format(new Date(log.data_atualizacao), 'dd/MM/yyyy HH:mm:ss')
    }))

    return (
        <div> 
            <Navbar pagina='Log Intercomunicação'/>
            <div>
            {logs.length > 0 && (
                formAvisos.map((log) => (
                    <p>{log.data_atualizacao} --- {log.operacao}</p>
                ))
            )}
            </div>
        </div>
    )
}

export default InterLog