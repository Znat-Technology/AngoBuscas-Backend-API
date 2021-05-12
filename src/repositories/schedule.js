const cron = require('node-cron')

exports.executeEveryDayAtMorning =  (action) => {
  
    cron.schedule('15 17 * * *', () => {
       action()
    })  
}
