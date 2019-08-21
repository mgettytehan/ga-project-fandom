// Import the mongoose module
const mongoose = require('mongoose');

// avoid deprecation warning on some find methods
// see https://mongoosejs.com/docs/deprecations.html#-findandmodify
mongoose.set('useFindAndModify', false);

const connectionString = process.env.MONGODB_URI || "mongodb://localhost/fandomlist";

mongoose.connect(connectionString, { useNewUrlParser: true})
  .then(() => {
    console.log("connected to mongo at: " + connectionString);
  });

module.exports = mongoose