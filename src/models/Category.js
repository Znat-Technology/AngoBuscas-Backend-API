/**
 * Autor: Znat Team
 * Data: 21/03/2021
 * Descricao: Modelagem da Collection categorias
*/

// Modulo para mapear os dados do Mongodb
const mongoose = require('mongoose')

// Modulo para carregar mensagens padraoes da API
const messages = require('../libs/messages')

// Modelagem da collection categories 
const categorySchema = new mongoose.Schema({
  description: {
      type: String,
      required: [true, messages.FIELD_REQUIRED]
    },
  typeFor: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

// Cria um modulo para o modelo Categiria mapeando o modelo para o Mongodb
module.exports = mongoose.model('Category', categorySchema)
