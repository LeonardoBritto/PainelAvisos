const jwt = require('jsonwebtoken')

const criarClienteTokenApi = async(cliente, req, res) => {
    const token = jwt.sign({
        cnpj: cliente.cnpj,
        codigo: cliente.codigo
    }, "integrativa@147")

    res.status(200).json({
        message: "Voce esta autenticado",
        token: token,
    })
}

module.exports = criarClienteTokenApi