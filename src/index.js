// Injecao de Dependencias de express, bodyParser
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
// Middleware para configurar o arquivo .env na app
require('dotenv').config()

// Cria o servidor Node js com express
const app = express()


//Conexao com o banco de dados 
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.MONGO_URL, options)

// Middleware para usar o body-parser(que converte a nossa requisicao para o formato json)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())

// Middlewares para as rotas da app

const categoryRoute = require('./routes/category')
const placeRoute = require('./routes/place')
const documentRoute = require('./routes/document')
const userRoute = require('./routes/user')
const companyRoute = require('./routes/company')
const adminRoute = require('./routes/admin')
const tokeRoute = require('./routes/validate_token')
const advertRoute = require('./routes/advert')
const liftingtRoute = require('./routes/lifting')
const peopleRoute = require('./routes/people')
const blogRoute = require('./routes/notice')

app.use('/uploads',express.static('uploads'))

app.use('/api/category', categoryRoute)
app.use('/api/place', placeRoute)
app.use('/api/document', documentRoute)
app.use('/api/user', userRoute)
app.use('/api/company', companyRoute)
app.use('/api/advert', advertRoute)
app.use('/api/people',peopleRoute)
app.use('/api/lifting', liftingtRoute)
app.use('/api/admin',tokeRoute, adminRoute)

const schedule = require('./repositories/schedule')
const sent = require('./controllers/LiftingController')

schedule.executeEveryDayAtMorning(() => {
  sent.feedback()
})

// Roda o servidor na porta configurada no arquivo .env
app.listen(process.env.PORT || 3000, () => {
  console.log(`Rodanda a app na porta ${process.env.PORT}`)
})
