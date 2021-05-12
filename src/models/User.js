/**
 * Autor: Znat Team
 * Data: 21/03/2021
 * Descricao: Modelagem dos Usuarios que vao as empresas 
*/

const mongoose = require('mongoose')
const messages = require('../libs/messages')

const userSchema = new mongoose.Schema({
   company: {
      type: mongoose.Types.ObjectId,
      required: [true, messages.FIELD_REQUIRED],
      ref: 'Company'
   },
   profile: {
     type: String,
     default: 'profile.jpg'
   },
   name: {
      type: String,
      required: [true, messages.FIELD_REQUIRED],
      min: 6,
      max: 20
   },
   email: {
      type: String,
      required: [true, messages.FIELD_REQUIRED],
      min: 8,
      max: 100
   },
   password: {
      type: String,
      required: [true, messages.FIELD_REQUIRED],
      min: 8,
      max: 20    
   },
   active: {
     type: Boolean,
     default: true
   },
   permissions: {
      type: [String]
   }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)