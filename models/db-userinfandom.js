const dbFactory = require('./db-factory.js');
const mongoose = require('./connection.js');

const userInFandomApi = dbFactory.dbModel('UserInFandom', {
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  fandomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Fandom', required: true},
});

userInFandomApi.deleteDocs = function(criteria) {
  return this.collection.deleteMany(criteria);
};

module.exports = {
  userInFandomApi
};