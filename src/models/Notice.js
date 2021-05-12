const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema({
   category: {
     type: String
   },
   image: {
     type: String
   },
   title: {
      type: String
   },
   description: {
      type: String
   },
   active: {
      type: Boolean,
      default: true
   }
}, { timestamps: true })

module.exports = mongoose.model('Notice', noticeSchema)