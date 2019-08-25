const dbFactory = require('./db-factory.js');


const siteLinkApi = dbFactory.dbModel('SiteLink', {
  siteName: String
});

module.exports = {
  siteLinkApi
};