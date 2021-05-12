const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        error: null,
        message: "Rota protegida",
        data: req.user
    })
})
module.exports = router