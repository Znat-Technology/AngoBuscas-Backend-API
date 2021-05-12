/**
 * Autor: Znat team
 * Data: 26/03/2021
 * Descricao: Metodos que executam todos os recursos de Anuncios na API
*/

 // Carrega o modulo da model Advert
 const Advert = require('../models/Advert')

 const ActiveAdvert = require('../models/ActiveAdvert')
 // Mensagens padroes para API
 const messages = require('../libs/messages')

 /**
 * Metodo responsavel por retornar todos os anuncios na plataforma
 * Criou-se o bloco try catch, a seguir invocamos o metodo find() de Advert
 * Se tudo correr bem armazena em categories o resultado da consulta
 * Se nao executa o bloco catch que envia um erro como response
 */

exports.index = async (req, res, next) => {
    try {
      const adverts = await Advert.find()
      res.status(200).json(adverts)       
    } catch (error) {
       res.status(500).json({error: error, message: messages.NOT_FOUND}) 
    } 
 }
 /**
  * Metodo responsavel por registrar um novo anuncio
  * Criou-se o bloco try catch, a seguir armazenamos a requisacoa no objecto depois,
  * instanciamos a classe Advert com o objecto advert
  * Entao executamos o metedo save() do objecto advert
  * Se tudo correr bem armazena em advert o resultado da consulta
  * Se nao executa o bloco catch que envia um erro como response
  */
 exports.post = async (req, res, next) => {
    const { company, banner, comments } = req.body
    const advert = new Advert({ company, banner, comments })
    try {
      const response = await advert.save()
      res.status(201).json(response)
    } catch (error) {
      res.status(400).json({error: error, message: messages.ERROR_REGISTER})   
    }
 }

 exports.allActiveAdverts = async (req, res, next) => {

  try {
    const response = await ActiveAdvert.find(null, {expireAt: 0, _id: 0}).populate({path: 'advert', select: {comments: 1, banner: 1, _id: 0}})
    res.json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.NOT_FOUND}) 
  } 
}
exports.advertOfCompany = async (req, res, next) => {

  try {
    const response = await Advert.find({
      company: req.params.id,
      active: true
    })
    res.json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.NOT_FOUND}) 
  } 
}

exports.disableAdvert = async (req, res, next) => {

  try {
    const response = await Advert.findByIdAndUpdate(req.params.id, {
      $set: {
        active: false
      }
    })
    res.json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.NOT_FOUND}) 
  } 
}

 exports.setActiveAdvert = async (req, res, next) => {

    const { advert, expireAt, highlights } = req.body
    let expire = new Date(expireAt)
    const activeAdvert = new ActiveAdvert( { advert, expireAt: expire, highlights })

    try {
      const response = await activeAdvert.save()
      res.json(response)

    } catch (error) {
      res.status(400).json({error: error, message: messages.ERROR_REGISTER}) 
    }
 }

