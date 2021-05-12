const router = require('express').Router()

const upload = require('./upload')

const DocumentController = require('../controllers/DocumentController')
 
router.get('/', DocumentController.index)

router.get('/mensagem', (req, res, next) => {
  res.json({msg: "ok"})
})

router.get('/submit', DocumentController.submited)

router.put('/search', DocumentController.search)

router.put('/count', DocumentController.count)

router.get('/countSubmited', DocumentController.countSubmited)

router.get('/:id', DocumentController.getById)

router.put('/accepted', DocumentController.allAccepted)

router.post('/register', upload.array('images'), DocumentController.post)

router.get('/received/:id', DocumentController.documentsReceived)

module.exports = router
