/**
 * Autor: Znat team
 * Data: 26/03/2021
 * Descricao: Endpoints do recurso Levamento da API
*/

// Carrega as rota do express
const router = require('express').Router()

// Carrega o controlador AdvertController
const LiftingController = require('../controllers/LiftingController')

// Endpoint que executa o metodo post do Controller 
router.post('/register', LiftingController.post)
router.get('/', LiftingController.index)

module.exports = router
