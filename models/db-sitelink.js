const dbFactory = require('./db-factory.js');


const siteLinkApi = dbFactory.dbModel('SiteLink', {
  siteName: {type: String, required: true}
});

module.exports = {
  siteLinkApi
};