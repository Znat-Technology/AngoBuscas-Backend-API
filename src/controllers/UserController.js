/**
 * Autor: Znat team
 * Data: 25/03/2021
 * Descricao: Metodos que executam todos os recursos de uma Tipo de lugar de documento na API
*/

const User = require('../models/User')
const messages = require('../libs/messages')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.index =  async(req, res, next) => {
  try {
     const users = await User.find()
     res.json(users)
   } catch (error) {
     res.status(400).json({error: error, message: messages.NOT_FOUND})
   }  
}
exports.active =  async(req, res, next) => {
  try {
     const users = await User.find({active: true})
     res.json(users)
   } catch (error) {
     res.status(400).json({error: error, message: messages.NOT_FOUND})
   }  
}
async function cryptPassword (password) {
  const salts = await bcrypt.genSalt(10)
  const passwordCrypt = await bcrypt.hash(password, salts)
  return passwordCrypt
} 
exports.post = async (req, res, next) => {
  
  const { company, profile, name, email, password, permissions } = req.body
  const passwordCrypt = await cryptPassword(password)

  const user = new User({ company, profile, name, email, password: passwordCrypt, permissions })

  try {

    const response = await user.save()
    res.status(201).json(response)

  } catch (error) {

    res.status(400).json({error: error, message: messages.ERROR_REGISTER})

  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name})
    const verifyPassword = await bcrypt.compare(req.body.password, user.password)

    if (!verifyPassword) {
      return res.json({message: messages.AUTH_FAILED, auth: false})
    }
    const userInfo = {
      _id: user._id,
      profile: user.profile,
      name: user.name,
      email: user.email,
      company: user.company,
      permissions: user.permissions,
      auth: true
    }
    const token = jwt.sign({
       user: userInfo
    }, process.env.TOKEN_KEY)
    
    userInfo['token'] = token

    res.header('auth-token', token).json(userInfo)

  } catch (error) {
    res.status(500).json({message: messages.NOT_FOUND})
  }
} 

exports.update = async (req, res, next) => {
  
  const _id = req.params.id
  const { permissions, name, email, password } = req.body
  const passwordCrypt = await cryptPassword(password)

  try {
    const response = await User.findByIdAndUpdate(_id, 
      {
        $set: {
          permissions: permissions,
          name: name,
          password: passwordCrypt,
          email: email
        }
      })
    res.json(response)
  } catch (error) {
    res.status(400).json({error: error, message: messages.ERROR_UPDATE})
  }
}
exports.disableUser = async(req, res, next) => {
  try {
    const response = await User.updateOne({_id: req.params.id}, {$set: { active: req.body.value }})
    res.json(response)
  } catch (error) {
    res.status(500).res(error)
  }
}
