const express = require('express')
const cors = require('cors')
const port = 5000

const app = express()

app.use(express.json())

//Salve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

const CentralInterLogRoutes = require('./routes/CentralInterLogRoutes')
const CentralIntercomunicacaoRoutes = require('./routes/CentralIntercomunicacaoRoutes')
const CentralMinerLogRoutes = require('./routes/CentralMinerLogRoutes')
const CentralMineradoraRoutes = require('./routes/CentralMineradoraRoutes')
const ClientesRoutes = require('./routes/ClientesRoutes')
const UsuariosRoutes = require('./routes/UsuariosRoutes')

app.use('/centralinterlog', CentralInterLogRoutes)
app.use('/centralinter', CentralIntercomunicacaoRoutes)
app.use('/centralminerlog', CentralMinerLogRoutes)
app.use('/centralminer', CentralMineradoraRoutes)
app.use('/clientes', ClientesRoutes)
app.use('/usuarios', UsuariosRoutes)

app.use('/', (req, res) => {
    res.status(200).json({mensagem: 'Sucesso - API em Node.js'})
})

app.listen(port, function() {
    console.log(`Servidor Ativo na porta: ${port}`)   
})