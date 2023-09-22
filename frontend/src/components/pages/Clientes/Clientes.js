import Navbar from "../../layout/Navbar"
import api from "../../../utils/api"

import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import Box from '@mui/material/Box'
import {DataGrid} from '@mui/x-data-grid'
import {Button} from "@mui/material"
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined'
import {ToastContainer, toast} from 'react-toastify'

function Clientes () {
    const [clientes, setClientes] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()    

    const colunas = [
        {field: 'id', headerName: 'Código', width: 90,},
        {field: 'cnpj', headerName: 'CNPJ', width: 150},
        {field: 'nome', headerName: 'Nome', width: 290}, 
        {field: 'usuario', headerName: 'Usuário', width: 250},
        {field: 'ipacesso', headerName: 'Ip Acesso', width: 180}, 
        {field: 'status', headerName: 'Situação', width: 100},
        {field: 'ativar', headerName: ' ',renderCell: (cellValues) => {
            return (
                <Button variant="contained" color='primary' startIcon={<PowerSettingsNewOutlinedIcon/>} onClick={(event) => {
                    ativdestiv(cellValues.row.cnpj)
                }}>Ativ/Desat</Button>
            )
        }, width: 150},
        {field: 'editar', headerName: ' ',renderCell: (cellValues) => {
            return (
                <Button variant="contained" color="warning" startIcon={<BorderColorRoundedIcon/>} onClick={(event) => {
                    editar(event, cellValues)
                  }}>Editar</Button>
            )
        }, width: 150}    
    ]

    useEffect(() => {
        api.get('clientes', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setClientes(response.data.clientes)
        })
    },[token])

    const editar = (event, cellValues) => {
        navigate(`/alterarcliente/${cellValues.row.cnpj}`)
    }

    async function ativdestiv(cnpj) {
        await api.patch(`clientes/ativar/${cnpj}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {            
            toast.success(response.data.mensagem, {autoClose: 1500}) 
            setTimeout(() => {
                window.location.reload() 
            },1500)                      
        }).catch((err) =>{
            toast.success(err.data.mensagem, {autoClose: 1500})           
        })    
    }

    /*const handleDelete = () => {
        deleteCliente(cnpj)
        setOpen(false)
    }

    async function deleteCliente(cnpj){
        await api.delete(`clientes/${cnpj}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updateClientes = clientes.filter((cliente) => cliente.cnpj !== cnpj)
            setClientes(updateClientes)
            toast.success(response.data.mensagem, {autoClose: 1500})            
        }).catch((err) =>{
            toast.success(err.data.mensagem, {autoClose: 1500})           
        })
    }*/

    return (
        <section>
            <Navbar pagina='CLIENTES'/>
            <ToastContainer/>
            <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={clientes}
                columns={colunas}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
            </Box>
        </section>
    )
}

export default Clientes