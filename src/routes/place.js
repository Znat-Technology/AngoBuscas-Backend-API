/**
 * Autor: Znat team
 * Data: 24/03/2021
 * Descricao: Endpoints do recurso Instituicoes para depositos de documentos da API
*/

const router = require('express').Router()
const PlaceController = require('../controllers/PlaceController')

router.get('/', PlaceController.index)

router.post('/register', PlaceController.post)

router.get('/active', PlaceController.active)

router.put('/update/:id', PlaceController.update)

router.put('/disable/:id', PlaceController.disable)
module.exports = router
