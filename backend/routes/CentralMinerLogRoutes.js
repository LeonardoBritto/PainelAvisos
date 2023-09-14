const router = require('express').Router()

const CentralMinerLogController = require('../controllers/CentralMinerLogController')

const verificarToken = require('../helpers/verificar-token')

router.get('/:cnpj', verificarToken, CentralMinerLogController.listar)
router.post('/inserir', verificarToken, CentralMinerLogController.inserir)

module.exports = router