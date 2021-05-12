const Notice = require('../models/Notice')
const messages = require('../libs/messages')

exports.index = async (req, res, next) => {
   try {
    const notices = Notice.find().populate({path: 'Category'}) 
    res.json(notices)
   } catch (error) {
       res.status(400).json(error)
   } 
}

exports.active = async (req, res, next) => {
  try {
   const notices = await Notice.find({
     active: true
   })
   res.json(notices)
  } catch (error) {
      res.status(400).json(error)
  } 
}

exports.post = async (req, res, next) => {
   const { category, image, description, title } = req.body 
   const notice = new Notice({ category, image, description, title })
   try {
    const response = await notice.save() 
    res.json(response)
   } catch (error) {
       res.status(401).json(error)
   }
}

exports.update = async (req, res, next) => {
    const { category, image, description } = req.body 
    const notice = new Notice({ category, image, description })
    try {
     const response = await notice.save() 
     res.json(response)
    } catch (error) {
        res.status(401).json(error)
    }
 }

 exports.disable = async(req, res, next) => {
    try {
      const response = await Notice.updateOne({_id: req.params.id}, {$set: { active: false }})
      res.json(response)
    } catch (error) {
      res.status(500).res(error)
    }
  }
