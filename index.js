// Injecao de Dependencias de express, bodyParser
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// Cria o servidor Node js com express
const app = express()

//Conexao com o banco de dados 
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect('mongodb://localhost/AngoBuscas', options)

// Middleware para configurar o arquivo .env na app
require('dotenv').config()

// Middleware para usar o body-parser(que converte a nossa requisicao para o formato json)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors())

// Middlewares para as rotas da app

const categoryRoute = require('./src/routes/category')
const placeRoute = require('./src/routes/place')
const documentRoute = require('./src/routes/document')
const userRoute = require('./src/routes/user')
const companyRoute = require('./src/routes/company')
const adminRoute = require('./src/routes/admin')
const tokeRoute = require('./src/routes/validate_token')
const advertRoute = require('./src/routes/advert')
const liftingtRoute = require('./src/routes/lifting')
const peopleRoute = require('./src/routes/people')
const blogRoute = require('./src/routes/notice')

app.use('/uploads',express.static('uploads'))

app.use('/api/category', categoryRoute)
app.use('/api/place', placeRoute)
app.use('/api/document', documentRoute)
app.use('/api/user', userRoute)
app.use('/api/company', companyRoute)
app.use('/api/advert', advertRoute)
app.use('/api/blog',blogRoute)
app.use('/api/people',peopleRoute)
app.use('/api/lifting', liftingtRoute)
app.use('/api/admin',tokeRoute, adminRoute)

const schedule = require('./src/repositories/schedule')
const sent = require('./src/controllers/LiftingController')

schedule.executeEveryDayAtMorning(() => {
  sent.feedback()
})
const PORT = process.env.PORT || 3000
// Roda o servidor na porta configurada no arquivo .env
app.listen(PORT, () => {
  console.log(`Rodanda a app na porta ${process.env.PORT}`)
})
