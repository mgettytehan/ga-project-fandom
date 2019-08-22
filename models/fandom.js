const mongoose = require('./connection.js');

const FandomSchema = new mongoose.Schema({
  mediaName: String,
  mediaTypeId: {type: mongoose.Schema.Types.ObjectId, ref: 'MediaType'}
});

const FandomCollection = mongoose.model('Fandom', FandomSchema);

function getAllFandoms() {
  return FandomCollection.find();
}

function getFandom(fandomId) {
  return FandomCollection.findById(fandomId);
}

function addFandom(newFandom) {
  return FandomCollection.insertMany(newFandom);
}

function updateFandom(fandomId, changedFandom) {
  return FandomCollection.findByIdAndUpdate(fandomId, changedFandom);
}

function deleteFandom(fandomId) {
  return FandomCollection.findByIdAndDelete(fandomId);
}


module.exports = {
  addFandom,
  deleteFandom,
  getAllFandoms,
  getFandom,
  updateFandom
}
