const dbFactory = require('./db-factory.js');

const userApi = dbFactory.dbModel('User', {
  username: String,
  bio: String,
  joinDate: Date,
  link: String
});

module.exports = {
  userApi
};