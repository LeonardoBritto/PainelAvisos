import { CssBaseline, Typography, Box, Grid, TextField, Button} from "@mui/material"
import { useState } from "react"

function ClienteForm ({handleSubmit, ClienteData}){
    const [cliente, setCliente] = useState(ClienteData || {})
    
    const submit = (e) => {
        //e.preventDefault()
        console.log("Cliente", cliente.nome)
        //handleSubmit(cliente)
    }

    function handleChange(e) {
        setCliente({ ...cliente, [e.target.name]: e.target.value })
    }

    return(
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <CssBaseline/>
            <Typography variant="h4" align="center" component="h1" gutterBottom>
                Editar Cliente
            </Typography>  
            <Box onSubmit={submit} sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}>                
                    <Grid container alignItems="center" spacing={2} xs={12}>
                        <Grid item xs={6}>
                            <TextField label="CNPJ" variant="outlined" value={ClienteData.cnpj || ''} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="NOME" variant="outlined" value={cliente.nome || ''} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="USUARIO" variant="outlined" value={cliente.usuario || ''} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="IP ACESSO" variant="outlined" value={cliente.ipacesso || ''} onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="SENHA" variant="outlined" onChange={handleChange}/>
                        </Grid>
                        <Grid item sx={{ mt: 1 }}>
                            <TextField label="CONFIRMA SENHA" variant="outlined" onChange={handleChange}/>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Salvar
                        </Button>                        
                    </Grid>               
            </Box>  
        </div>
    )
}

export default ClienteForm