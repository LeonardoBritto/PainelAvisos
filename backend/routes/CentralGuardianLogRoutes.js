const router = require('express').Router()

const CentralGuardianLogController = require('../controllers/CentralGuardianLogController')

const verificarToken = require('../helpers/verificar-token')

router.get('/:cnpj', verificarToken, CentralGuardianLogController.listar)
router.post('/inserir', verificarToken, CentralGuardianLogController.inserir)

module.exports = router