const startTraining = require('./startTraining')
module.exports = {
  ...require('./getActiveTrainigs'),
  ...require('./updateTrainigStatus'),
  startTraining,
}
