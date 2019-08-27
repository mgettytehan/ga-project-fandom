const dbFactory = require('./db-factory.js');

const userApi = dbFactory.dbModel('User', {
  username: {type: String, required: true},
  bio: String,
  joinDate: {type: Date, required: true},
});

module.exports = {
  userApi
};