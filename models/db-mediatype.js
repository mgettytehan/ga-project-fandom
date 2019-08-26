const dbFactory = require('./db-factory.js');


const mediaTypeApi = dbFactory.dbModel('MediaType', {
  typeName: {type: String, required: true}
});

module.exports = {
  mediaTypeApi
};
