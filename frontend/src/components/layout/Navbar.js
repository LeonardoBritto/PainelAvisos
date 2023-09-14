import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GlobalStyles from '@mui/material/GlobalStyles'
import {useContext} from 'react'
import {Context} from '../../context/UsuarioContext'
import {ToastContainer} from 'react-toastify'

const defaultTheme = createTheme()

function Navbar ({pagina}) {
    const {logout, adm} = useContext(Context)   

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer/>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}/>
            <CssBaseline/> 
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>                        
                        {pagina}                                              
                    </Typography>
                    <nav>                     
                    {adm && (
                        <>
                        <Link
                        variant="button"
                        color="text.primary"
                        href="/avisos"
                        sx={{ my: 1, mx: 1.5 }}
                        disable={true}
                        >
                        Avisos
                        </Link> 
                        <Link
                        variant="button"
                        color="text.primary"
                        href="/clientes"
                        sx={{ my: 1, mx: 1.5 }}
                        >
                        Clientes
                        </Link>
                        <Link
                        variant="button"
                        color="text.primary"
                        href="/usuarios"
                        sx={{ my: 1, mx: 1.5 }}
                        >
                        Usuários
                        </Link>
                        </>
                    )}                      
                    
                    </nav>
                    <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={logout}>
                        Sair
                    </Button>
                </Toolbar>    
            </AppBar>            
        </ThemeProvider>
    )
}

export default Navbar