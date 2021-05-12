/**
 * Autor: Znat team
 * Data: 26/03/2021
 * Descricao: Endpoints do recurso Anuncios da API
*/

// Carrega as rota do express
const router = require('express').Router()

// Carrega o controlador AdvertController
const AdvertController = require('../controllers/AdvertController')

// Endpoint que executa o metodo index do Controller 
router.get('/', AdvertController.index)

// Endpoint que executa o metodo post do Controller 
router.post('/register', AdvertController.post)

router.post('/set', AdvertController.setActiveAdvert)

router.put('/disable/:id', AdvertController.disableAdvert)

router.get('/active', AdvertController.allActiveAdverts)

router.get('/company/:id', AdvertController.advertOfCompany)

module.exports = router