const router = require('express').Router()
const UserController = require('../controllers/UserController')

// Rota que carrega a funcao index do controlador de Usuarios
router.get('/', UserController.index)

router.get('/active', UserController.active)

// Rota que carrega a funcao post do controlador de Usuarios
router.post('/register', UserController.post)

router.put('/update/:id', UserController.update)

router.put('/disable/:id', UserController.disableUser)

router.post('/login', UserController.login)
/* 
router.post('/login', UserController.login)

router.put('/update/:id', UserController.update)
*/
module.exports = router
