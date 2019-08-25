const dbFactory = require('./db-factory.js');


const mediaTypeApi = dbFactory.dbModel('MediaType', {
  typeName: String,
});

module.exports = {
  mediaTypeApi
};
