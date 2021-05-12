/**
 * Autor: Znat Team
 * Data: 21/03/2021
 * Descricao: Modelagem das Empresas que vao gerir o AngoBuscas 
*/

const mongoose = require('mongoose')
const messages = require('../libs/messages')

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

const companySchema = new mongoose.Schema({ 
    logo: {
      type: String
    },
    nif: {
      type: String,
      required: [true, messages.FIELD_REQUIRED]
    },
    name: {
     type: String,
     required: [true, messages.FIELD_REQUIRED]
    },
    contacts: [contactSchema],
    description: {
      type: String
    },
    active: {
      type: Boolean,
      default: true
    },
    address: address
}, {timestamps: true})

module.exports = mongoose.model('Company', companySchema)
