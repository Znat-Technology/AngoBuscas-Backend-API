/**
 * Autor: Znat team
 * Data: 23/03/2021
 * Descricao: Metodos que executam todos os recursos de uma Categoria de documento na API
 * Parametros padroes: 
*/

 // Carrega o modulo da model Category
const Category = require('../models/Category')

// Mensagens padroes da API
const messages = require('../libs/messages')

/**
 * Metodo responsavel por retornar todas as categorias de documentos
 * Criou-se o bloco try catch, a seguir invocamos o metodo find() de Category
 * Se tudo correr bem armazena em categories o resultado da consulta
 * Se nao executa o bloco catch que envia um erro como response
 */
exports.index = async (req, res, next) => {
   try {
     const categories = await Category.find()
     res.status(200).json(categories)       
   } catch (error) {
      res.status(500).json({error: error, message: messages.NOT_FOUND}) 
   } 
}
exports.categoryFor = async (req, res, next) => {
  try {
    const categories = await Category.find({
      typeFor: req.params.typeFor
    })
    res.status(200).json(categories)       
  } catch (error) {
     res.status(500).json({error: error, message: messages.NOT_FOUND}) 
  } 
}
/**
 * Metodo responsavel por registrar uma nova categoria de documento
 * Criou-se o bloco try catch, a seguir armazenamos a requisacoa no objecto depois,
 * instanciamos a classe Category com o objecto category
 * Entao executamos o metedo save() do objecto category
 * Se tudo correr bem armazena em categories o resultado da consulta
 * Se nao executa o bloco catch que envia um erro como response
 */
exports.post = async (req, res, next) => {
   const { description, typeFor } = req.body
   const category = new Category({ description, typeFor })
   try {
     const responseData = await category.save()
     res.status(201).json(responseData)
   } catch (error) {
     res.status(400).json({error: error, message: messages.ERROR_REGISTER})   
   }
}
exports.update = async (req, res, next) => {
  const { description, typeFor } = req.body
  try {
    const responseData = await Category.updateOne(req.params.id, {$set: {
       description: description,
       typeFor: typeFor
     }
   })
    res.status(201).json(responseData)
  } catch (error) {
    res.status(400).json({error: error, message: messages.ERROR_REGISTER})   
  }
}
exports.active =  async(req, res, next) => {
  try {
     const categories = await Category.find({active: true})
     res.json(categories)
   } catch (error) {
     res.status(400).json({error: error, message: messages.NOT_FOUND})
   }  
}
exports.disable = async(req, res, next) => {
  try {
    const response = await Category.updateOne({_id: req.params.id}, {$set: { active: false }})
    res.json(response)
  } catch (error) {
    res.status(500).res(error)
  }
}
