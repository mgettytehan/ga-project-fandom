const dbFactory = require('./db-factory.js');
const mongoose = require('./connection.js');

const userSiteApi = dbFactory.dbModel('UserSite', {
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  siteLinkId: {type: mongoose.Schema.Types.ObjectId, ref: 'SiteLink'},
  link: String
});

userSiteApi.deleteDocs = function(criteria) {
  console.log(this);
  return this.collection.deleteMany(criteria);
};

module.exports = {
  userSiteApi
};