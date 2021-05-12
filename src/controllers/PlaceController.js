/**
 * Autor: Znat team
 * Data: 24/03/2021
 * Descricao: Metodos que executam todos os recursos de uma Instituicao na API
 * Parametros padroes: 
 * @param {*} req : Recebe a requisiçao http ou seja os dados vindo do Client-side
 * @param {*} res : Parametro que retorna 
 * @param {*} next : Passa para o proximo callback
*/

// Carrega a model Place
const Place = require('../models/Place')

const messages = require('../libs/messages')

/**
 * Metodo responsavel por retornar todas as Instituicoes 
 * Criou-se o bloco try catch, a seguir invocamos o metodo find() de Category
 * Se tudo correr bem armazena em categories o resultado da consulta
 * Se nao executa o bloco catch que envia um erro como response
 */

exports.active =  async(req, res, next) => {
  try {
     const places = await Place.find({active: true})
     res.json(places)
   } catch (error) {
     res.status(400).json({error: error, message: messages.NOT_FOUND})
   }  
}

exports.index = async (req, res, next) => {
  try {
     const place = await Place.find()
     res.json(place) 
  } catch (error) {
    res.status(400).json({error: error, message: messages.NOT_FOUND})    
  }
}

exports.post = async (req, res, next) => {
  const { institute, street, province, county, typePlace } = req.body
  const address =  {
    province: province,
    street: street,
    county: county
  }
  const place = new Place({ institute, typePlace, address })
  try {
    const response = await place.save()
    res.json(response) 
  } catch (error) {
    res.status(400).json({error: error, message: messages.ERROR_REGISTER})
  }
}

exports.disable = async(req, res, next) => {
  try {
    const response = await Place.updateOne({_id: req.params.id}, {$set: { active: false }})
    res.json(response)
  } catch (error) {
    res.status(500).res(error)
  }
}

exports.update = async (req, res, next) => {
  
  const _id = req.params.id
  const { institute, street, province, county, typePlace } = req.body
  
  const address =  {
    province: province,
    street: street,
    county: county
  }

  try {
    const response = await Place.findByIdAndUpdate(_id, 
      {
        $set: {
          institute: institute,
          typePlace: typePlace,
          address: address
        }
      })
    res.json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.ERROR_UPDATE})
  }
}
