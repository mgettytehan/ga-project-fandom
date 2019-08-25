const dbFactory = require('./db-factory.js');
const mongoose = require('./connection.js');

const userInFandomApi = dbFactory.dbModel('UserInFandom', {
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  fandomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Fandom'},
});

userInFandomApi.deleteDocs = function(criteria) {
  console.log(this);
  return this.collection.deleteMany(criteria);
};

module.exports = {
  userInFandomApi
};