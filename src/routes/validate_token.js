

const jwt = require('jsonwebtoken')

const tokenVerify = (req, res, next) => {
  const token = req.header('auth-token')

  if(!token) return res.json({msg: "Acesso negado"})
  try {
    const verify = jwt.verify(token, process.env.TOKEN_KEY)
    req.user = verify
    next()
  } catch (error) {
    res.status(500).json({error: error, message: 'Token Invalido'})
  }
}

module.exports = tokenVerify