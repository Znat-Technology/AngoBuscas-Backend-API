/**
 * Autor: Znat team
 * Data: 25/03/2021
 * Descricao: Endpoints do recurso Empresas da API
*/

// Carrega as rota do express
const router = require('express').Router()

// Carrega o controlador CategoriaController
const CompanyController = require('../controllers/CompanyController')

// Endpoint que executa o metodo index do Controller 
router.get('/', CompanyController.index)

router.get('/active', CompanyController.active)

router.put('/disable/:id', CompanyController.disableCompany)

router.put('/update/:id', CompanyController.update)

// Endpoint que executa o metodo post do Controller 
router.post('/register', CompanyController.post)

module.exports = router