const router = require('express').Router()
const upload = require('../routes/upload')
const PeopleController = require('../controllers/PeopleController')

router.get('/', PeopleController.index)
router.put('/search', PeopleController.search)

router.get('/submit', PeopleController.submited)

router.put('/count', PeopleController.count)
router.get('/countSubmited', PeopleController.countSubmited)

router.put('/accepted', PeopleController.allAccepted)

router.get('/banner', PeopleController.getFirst16)

router.post('/register', upload.array('images') ,PeopleController.post)

module.exports = router
