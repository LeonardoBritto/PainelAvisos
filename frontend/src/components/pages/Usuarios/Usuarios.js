import Navbar from "../../layout/Navbar"
import api from "../../../utils/api"

import {useState, useEffect} from "react"

import Box from '@mui/material/Box'
import {DataGrid} from '@mui/x-data-grid'
import {Button, Dialog, DialogTitle, DialogActions} from "@mui/material"
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import {ToastContainer, toast} from 'react-toastify'

function Usuarios () {
    const [usuarios, setusuarios] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const [open, setOpen] = useState(false)
    const [codigo, setCodigo] = useState({})    

    const colunas = [
        {field: ' ', headerName: ' ', width: 300,},
        {field: 'id', headerName: 'Código', width: 90,},
        {field: 'nome', headerName: 'Nome', width: 150},
        {field: 'login', headerName: 'Login', width: 180},
        {field: 'nivel', headerName: 'Nível', width: 90},
        {field: 'alterar', headerName: ' ',renderCell: (cellValues) => {
            return (
                <Button variant="contained" color="primary" startIcon={<BorderColorRoundedIcon/>} >Alterar</Button>
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
        api.get('usuarios', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setusuarios(response.data.usuarios)
        })
    },[token])

    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = (event, cellValues) => {
       setCodigo(cellValues.row.id);
       setOpen(true)
    }

    const handleDelete = () => {
        deleteUsuario(codigo)
        setOpen(false)
    }

    async function deleteUsuario(codigo){
        await api.delete(`usuarios/${codigo}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updateUsuarios = usuarios.filter((usuario) => usuario.id !== codigo)
            setusuarios(updateUsuarios)
            toast.success(response.data.mensagem, {autoClose: 1500})
            return response.data.mensagem
        }).catch((err) =>{
            toast.success(err.data.mensagem, {autoClose: 1500})
            return err.data.mensagem
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Deseja realmente excluir este usuário?"}
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

export default Usuarios