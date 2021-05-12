const moment = require('moment')

exports.getDaysBetween2Dates = function (past) {
  
    const now = moment(new Date())
    const pastDate = moment(past)
    const duration = moment.duration(now.diff(pastDate))

  return duration.asDays()
}