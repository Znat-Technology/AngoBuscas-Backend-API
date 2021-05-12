/**
 *  Autor: Znat Team
 * Data: 26/03/2021
 * Descricao: Modelagem da Collection Pessoas perdidas
 */

const mongoose = require('mongoose')
const messages = require('../libs/messages')

const peopleSchema = new mongoose.Schema({
   images: [String],
   name: {
     type: String,
     required: messages.FIELD_REQUIRED
   },
   category: {
     type: String
   },
   age: {
     type: Number,
     required: messages.FIELD_REQUIRED  
   },
  found: {
     type: Boolean,
     default: false
  },
  description: {
     type: String,
     max: 255
   },
  received: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  accepted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('People', peopleSchema)
