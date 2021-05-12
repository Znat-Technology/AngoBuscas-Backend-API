/**
 * Autor: Znat Team
 * Data: 21/03/2021
 * Descricao: Recursos da API das empresas que vao gerir o AngoBuscas 
*/
const Company = require('../models/Company')
const messages = require('../libs/messages')

exports.index = async (req, res, next) => {
   try {
     const companies = await Company.find()
     res.json(companies)
   } catch (error) {
      res.status(500).json({error: error, message: messages.NOT_FOUND})
   }
}

exports.active =  async(req, res, next) => {
  try {
     const companies = await Company.find({active: true})
     res.json(companies)
   } catch (error) {
     res.status(400).json({error: error, message: messages.NOT_FOUND})
   }  
}

exports.post = async (req, res, next) => {
  const { logo, nif, name, contacts, description, county, province, street } = req.body
  const address = { county, province, street }
  const companyModel = new Company({ logo, nif, name, contacts, description, address: address })

  try {
    const response = await companyModel.save() 
    res.status(201).json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.ERROR_REGISTER})
  }
}

exports.disableCompany = async (req, res, next) => {

  try {
    const disable = false
    const response = await Company.updateOne({_id: req.params.id}, {
      $set: {
        active: disable
      }
     }
    )
    res.json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.NOT_FOUND}) 
  } 
}
exports.update = async (req, res, next) => {
  
  const _id = req.params.id
  const { logo, nif, name, description, county, province, street } = req.body
  const address = { county, province, street }

  try {
    const response = await Company.findByIdAndUpdate(_id, 
      {
        $set: {
          logo: logo,
          nif: nif,
          name: name,
          description: description,
          address: address
        }
      })
    res.json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.ERROR_UPDATE})
  }
}