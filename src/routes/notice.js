const router = require('express').Router()

const noticeController = require('../controllers/NoticeController')

router.get('/', noticeController.index)

router.get('/active', noticeController.active)

router.post('/register', noticeController.post)

router.put('/update/:id', noticeController.update)

router.put('/disable/:id', noticeController.disable)

module.exports = router
