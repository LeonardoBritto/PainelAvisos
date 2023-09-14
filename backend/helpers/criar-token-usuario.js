const jwt = require('jsonwebtoken')

const criarTokenUsuario = async(usuario, req, res) => {
    const token = jwt.sign({
        login: usuario.login,
        codigo: usuario.codigo
    }, 'integrativa@147')
    
    res.status(200).json({mensagem: 'Login realizado com sucesso!', token: token, nivel: usuario.nivel})
}

module.exports = criarTokenUsuario