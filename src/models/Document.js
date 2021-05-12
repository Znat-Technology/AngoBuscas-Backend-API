/**
 * Autor: Znat Team
 * Data: 21/03/2021
 * Descricao: Modelagem da Coleçao documentos
 * Palvras chaves:
 * - timestamps: os campos createdAt e updateAt
*/

// Modulo para mapear os dados do Mongodb
const mongoose = require('mongoose')

// Modulo para carregar mensagens padraoes da API
const messages = require('../libs/messages')


/**
 * Esquema para um documento, com a seguinte descriçao:
 * number: Numero do documento
 * category: Tipo de documento
 * images: Listas do links das imagens do documento
 */ 

/**
 * Esquema (Evento) para um Registrar conjunto de documentos, com a seguinte descriçao:
 * owner: Nome do proprietario da lista de documentos
 * docs: E um array de Doc
 * comments: Observaçoes sobre os documentos 
 * received: Campo que diz se o documento foi recebido pelo proprietario
 * accepted: Campo que diz se os documentos foram aceite na plataforma
 */

 const address = mongoose.Schema({
  typePlace: String,
  institute: String,
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
   }
 })

const documentsSchema = new mongoose.Schema({
  onwner: {
    type: String,
    required: [true, messages.FIELD_REQUIRED],
  },
  images: [String],
  category: {
    type: String
   },
  depositedPlace: address,
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
}, { timestamps: true})

// Cria um modulo para o modelo Document mapeando o modelo para o Mongodb
module.exports = mongoose.model('Document', documentsSchema)
