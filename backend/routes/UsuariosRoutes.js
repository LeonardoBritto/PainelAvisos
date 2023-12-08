const router = require('express').Router()

const UsuariosController = require('../controllers/UsuariosController')

const verificarToken = require('../helpers/verificar-token')

router.post('/login', UsuariosController.logar)
router.get('/', verificarToken, UsuariosController.listar)
router.get('/:codigo', verificarToken, UsuariosController.buscaUsuario)
router.post('/inserir', verificarToken, UsuariosController.inserir)
router.patch('/:codigo', verificarToken, UsuariosController.editar)
router.delete('/:codigo', verificarToken, UsuariosController.excluir)
router.patch('/ativar/:codigo', verificarToken, UsuariosController.mudarEstado)

module.exports = router