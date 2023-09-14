const router = require('express').Router()

const CentralMineradoraController = require('../controllers/CentralMineradoraController')

const verificarToken = require('../helpers/verificar-token')

router.get('/', verificarToken, CentralMineradoraController.listar)
router.post('/inserir', verificarToken, CentralMineradoraController.inserir)

module.exports = router