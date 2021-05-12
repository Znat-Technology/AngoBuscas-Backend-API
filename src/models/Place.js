/**
 * Autor: Znat team
 * Data: 21/03/2021
 * Descricao: Modelagem da Coleçao Local de entrega
*/
const mongoose = require('mongoose')

// Modulo mensagens da API
const messages = require('../libs/messages')

/**
 * Modelagem da coleçao Place Descricao dos campos:
 * instituion: Nome do instituicao em que foi depositado,
 * street: Rua da local de deposito
 * province: Provincia em que se encontra a instituicao
 * county: Munipicio em que se encontra a instituicao
 * country: Pais onde se encontra o local
 * typePlace: Categoria do local de deposito
 */

const contactSchema = new mongoose.Schema({
  email: String,
  telephone_number: String
})

const address = mongoose.Schema({ 
 street: {
  type: String,
    required: [true, messages.FIELD_REQUIRED]
  },
  province: {
    type: String,
    required: [true, messages.FIELD_REQUIRED]
  },
  county: {
    type: String,
    required: [true, messages.FIELD_REQUIRED]
  },
  country: {
    type: String,
    default: "Angola"
  }
})

const placeSchema = new mongoose.Schema({
  image: {
    type: String
  },
  institute: {
    type: String,
    required: [true, messages.FIELD_REQUIRED]
  },
  typePlace: {
    type: String,
  },
  contacts: [contactSchema],
  description: {
    type: String,
    max: 255
  },
  address: address,
  active: {
    type: Boolean,
    default: true
  }
}, {timestamps: true}) 

module.exports = mongoose.model('Place', placeSchema)
