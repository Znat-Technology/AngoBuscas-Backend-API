/**
 * Autor: Znat Team
 * Data: 26/03/2021
 * Descricao: Modelagem da Collection dos anuncios activos de cada empresa
 */

const mongoose = require('mongoose')
const messages = require('../libs/messages')

const activeAdvertSchema = new mongoose.Schema({
    advert: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Advert',
       required: messages.FIELD_REQUIRED
    },
    expireAt: {
        type: Date,
        default: null
    },
    highlights: {
        type: Boolean,
        default: false
    }
})
activeAdvertSchema.index({"expireAt": 1}, {"expireAfterSeconds": 0})
module.exports = mongoose.model('Active_Advert', activeAdvertSchema)
