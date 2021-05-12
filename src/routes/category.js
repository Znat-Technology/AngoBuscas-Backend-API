/**
 * Autor: Znat team
 * Data: 23/03/2021
 * Descricao: Endpoints do recurso Categorias de documentos da API
*/

// Carrega as rota do express
const router = require('express').Router()

// Carrega o controlador CategoriaController
const CategoriaController = require('../controllers/CategoryController')

// Endpoint que executa o metodo index do Controller 
router.get('/', CategoriaController.index)

router.get('/active', CategoriaController.active)

router.get('/typefor/:typeFor', CategoriaController.categoryFor)

// Endpoint que executa o metodo post do Controller 
router.post('/register', CategoriaController.post)

router.put('/update/:id', CategoriaController.update)

router.put('/disable/:id', CategoriaController.disable)

module.exports = router
