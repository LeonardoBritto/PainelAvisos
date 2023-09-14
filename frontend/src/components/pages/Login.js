import {Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {createTheme, ThemeProvider} from "@mui/material/styles"
import {ToastContainer} from 'react-toastify'

/*Context*/
import {Context} from "../../context/UsuarioContext"
import {useContext, useState} from "react";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://integrativa.com.br/">
          Integrativa
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const defaultTheme = createTheme();

function Login () {
    const [usuario, setUsuario] = useState({})
    const {login} = useContext(Context)

    function handleChange(e) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(usuario)
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer/>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline/>
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage:  'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />  
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Painel de Avisos - Autenticação
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="Senha"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Entrar
                    </Button>
                    <Copyright sx={{ mt: 5 }} />   
                    </Box>
                </Box>
                </Grid> 
            </Grid>
        </ThemeProvider>
    )
}

export default Login