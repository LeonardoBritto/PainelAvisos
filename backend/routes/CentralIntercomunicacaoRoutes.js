const router = require('express').Router()

const CentralIntercomunicacaoController = require('../controllers/CentralIntercomunicacaoController')

const verificarToken = require('../helpers/verificar-token')

router.get('/', verificarToken, CentralIntercomunicacaoController.listar)
router.post('/inserir', verificarToken, CentralIntercomunicacaoController.inserir)

module.exports = router