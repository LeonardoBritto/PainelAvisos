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

function Usuarios () {
    const [usuarios, setusuarios] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()     

    const colunas = [
        {field: ' ', headerName: ' ', width: 200,},
        {field: 'id', headerName: 'Código', width: 90,},
        {field: 'nome', headerName: 'Nome', width: 150},
        {field: 'login', headerName: 'Login', width: 180},
        {field: 'nivel', headerName: 'Nível', width: 120},
        {field: 'status', headerName: 'Situação', width: 100},
        {field: 'ativar', headerName: ' ',renderCell: (cellValues) => {
            return (
                <Button variant="contained" color='primary' startIcon={<PowerSettingsNewOutlinedIcon/>} onClick={(event) => {
                    ativdestiv(cellValues.row.id)
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
        api.get('usuarios', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setusuarios(response.data.usuarios)
        })
    },[token])

    const editar = (event, cellValues) => {
        navigate(`/alterarusuario/${cellValues.row.codigo}`)
    }

    async function ativdestiv(codigo) {
        await api.patch(`usuarios/ativar/${codigo}`, {
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

    return (
        <section>
            <Navbar pagina='USUÁRIOS'/>
            <ToastContainer/>
            <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={usuarios}
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

export default Usuarios