const dbFactory = require('./db-factory.js');
const mongoose = require('./connection.js');

const fandomApi = dbFactory.dbModel('Fandom', {
  mediaName: String,
  mediaTypeId: {type: mongoose.Schema.Types.ObjectId, ref: 'MediaType'}
});

module.exports = {
  fandomApi
};