const router = require('express').Router()

const CentralInterLogController = require('../controllers/CentralInterLogController')

const verificarToken = require('../helpers/verificar-token')

router.get('/:cnpj', verificarToken, CentralInterLogController.listar)
router.post('/inserir', verificarToken, CentralInterLogController.inserir)

module.exports = router