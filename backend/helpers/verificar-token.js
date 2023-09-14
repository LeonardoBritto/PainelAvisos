const jwt = require('jsonwebtoken')
const pegarToken = require('./pegar-token.')

const verificarToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: "Acesso Negado - Header Authorization Vazio!"})    
    }

    const token = pegarToken(req)

    if(!token){
        return res.status(401).json({message: "Acesso Negado - Token Vazio!"})
    }

    try {
        const verified = jwt.verify(token, "integrativa@147")
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({message: "Token Inválido"})
    }
}

module.exports = verificarToken