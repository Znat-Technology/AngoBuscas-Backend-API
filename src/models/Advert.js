/**
 * Autor: Znat Team
 * Data: 26/03/2021
 * Descricao: Modelagem da Collection anuncios de cada empresa
 */

const mongoose = require('mongoose')

const messages = require('../libs/messages')

const advertSchema = new mongoose.Schema({
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    banner: {
      type: String,
      required: messages.FIELD_REQUIRED
    },
    comments: {
      type: String,
      max: 255
    },
    active: {
      type: Boolean,
      default: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Advert', advertSchema)
