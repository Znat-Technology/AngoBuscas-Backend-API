/**
 * Autor: Znat team
 * Data: 26/03/2021
 * Descricao: Metodos que executam todos os recursos de uma Levantamento de documentos na API
*/

 // Carrega o modulo da model Lifting

const Lifting = require('../models/Lifting')
const messages = require('../libs/messages')
const sent = require('../repositories/sent')

exports.index = async (req, res, next) => {
  try {
    const surveys = await Lifting.find()
    res.json(surveys)
  } catch (error) {
    res.status(400).json({error: error, message: messages.NOT_FOUND})
  }
}

exports.post = async (req, res, next) => {
    const { documents, telephone_number, email, past } = req.body
    let date = new Date(past)
    const lifting = new Lifting({ documents, telephone_number, email, past: date })
    try {
      const response = await lifting.save()
      res.status(201).json(response)
    } catch (error) {
      res.status(400).json({error: error, message: messages.ERROR_REGISTER})   
    }
 }
exports.feedback = async () => {
  
  const fields = { _id: 0, email: 1, telephone_number: 1, documents: 1, past: 1, done: 1 }

  try {
  
    const surveys = await Lifting.find({done: false}, fields)
    const dateTimes = require('../repositories/date_times')
 
    surveys.forEach((survey) => {
      const days = parseInt(dateTimes.getDaysBetween2Dates(survey.past))
      if (days === 2 || days === 7 ) {
        const { documents, email } = survey
        sent.email({ documents, email })
      }
    })
    
  } catch (error) {
    console.log(error)
  }
}