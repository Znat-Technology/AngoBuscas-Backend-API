/**
 * Autor: Znat Team
 * Data: 24/03/2021
 * Descricao: Modelagem da Coleçao levantamento do Documento
 * Palvras chaves:
 * - timestamps: os campos createdAt e updateAt
*/

const mongoose = require('mongoose')
const messages = require('../libs/messages')

const liftingSchema = new mongoose.Schema({
    documents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: [true, messages.FIELD_REQUIRED]
    },
    telephone_number: {
       type: String,
       min: 9,
       max: 9
    },
    email: {
      type: String
    },
    past: {
      type: Date
    },
    done: {
      type: Boolean,
      default: false  
    }
}, {timestamps: true})

module.exports = mongoose.model('Lifting', liftingSchema)
