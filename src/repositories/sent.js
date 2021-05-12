const nodemailer = require('nodemailer')
const endpoints = require('../libs/endpoints')

exports.email = (data) => {
      
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_EMAIL,
    auth: {
        user: process.env.ADDRESS_EMAIL_FEEDBACK,
        pass: process.env.PASSWORD_EMAIL_FEEDBACK
    }
  })
  let email = {
      from: process.env.ADDRESS_EMAIL_FEEDBACK,
      to: data.email,
      subject: 'Ango Buscas - FeedBack',
      text: `${endpoints.FEEDBACK_OK}${data.documents}`
    }
    transporter.sendMail(email, (error, data) => {
       console.log((error) ? error :  data.response)
    })
}