import Navbar from "../../layout/Navbar"
import api from "../../../utils/api"

import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import Box from '@mui/material/Box'
import {DataGrid} from '@mui/x-data-grid'
import {Button, Dialog, DialogTitle, DialogActions} from "@mui/material"
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import {ToastContainer, toast} from 'react-toastify'

function Clientes () {
    const [clientes, setClientes] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const [open, setOpen] = useState(false)
    const [cnpj, setCnpj] = useState({})
    const navigate = useNavigate()

    const colunas = [
        {field: 'id', headerName: 'Código', width: 90,},
        {field: 'cnpj', headerName: 'CNPJ', width: 150},
        {field: 'nome', headerName: 'Nome', width: 360}, 
        {field: 'usuario', headerName: 'Usuário', width: 250},
        {field: 'ipacesso', headerName: 'Ip Acesso', width: 180}, 
        {field: 'alterar', headerName: ' ',renderCell: (cellValues) => {
            return (
                <Button variant="contained" color="primary" startIcon={<BorderColorRoundedIcon/>} onClick={(event) => {
                    editar(event, cellValues)
                }}>Alterar</Button>
            )
        }, width: 150},
        {field: 'excluir', headerName: ' ',renderCell: (cellValues) => {
            return (
                <Button variant="contained" color="error" startIcon={<DeleteIcon/>} onClick={(event) => {
                    handleClick(event, cellValues)
                  }}>Excluir</Button>
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

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = (event, cellValues) => {
       setCnpj(cellValues.row.cnpj);
       setOpen(true)
    }

    const handleDelete = () => {
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
    }

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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Deseja realmente excluir este cliente?"}
            </DialogTitle>
            <DialogActions>
            <Button onClick={handleDelete}>Sim</Button>
            <Button onClick={handleClose} autoFocus>
                Não
            </Button>
            </DialogActions>    
            </Dialog>
        </section>
    )
}

export default Clientes