const dbFactory = require('./db-factory.js');
const mongoose = require('./connection.js');

const userSiteApi = dbFactory.dbModel('UserSite', {
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  siteLinkId: {type: mongoose.Schema.Types.ObjectId, ref: 'SiteLink', required: true},
  link: {type: String, required: true}
});

userSiteApi.deleteDocs = function(criteria) {
  return this.collection.deleteMany(criteria);
};

module.exports = {
  userSiteApi
};