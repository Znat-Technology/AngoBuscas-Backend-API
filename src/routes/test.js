
const router = require('express').Router()

router.get('/', (req, res, next => {
   res.json({
     "messagem": "Api na Nuvem"
   })
}))

module.exports = router