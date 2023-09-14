const router = require('express').Router()

const ClientesController = require('../controllers/ClientesController')

const checarIp = require('../helpers/checar-ip')
const verificarToken = require('../helpers/verificar-token')

router.post('/autenticar', checarIp, ClientesController.autenticar)
router.post('/inserir', verificarToken, ClientesController.inserir)
router.get('/', verificarToken, ClientesController.listar)
router.get('/:cnpj', verificarToken, ClientesController.buscaCliente)
router.patch('/:cnpj', verificarToken, ClientesController.editar)
router.delete('/:cnpj', verificarToken, ClientesController.excluir)
router.patch('/ativo/:cnpj', verificarToken, ClientesController.mudarEstado)

module.exports = router