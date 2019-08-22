const mongoose = require('./connection.js');

const ActiveFandomSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  fandomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Fandom'},
});

const ActiveFandomCollection = mongoose.model('ActiveFandom', ActiveFandomSchema);

function getAllActiveFandoms() {
  return ActiveFandomCollection.find();
}

function getActiveFandom(activeFandomId) {
  return ActiveFandomCollection.findById(activeFandomId);
}
//intended to take an array of multiple
function addActiveFandoms(newActiveFandoms) {
  return ActiveFandomCollection.insertMany(newActiveFandoms);
}

function deleteActiveFandom(activeFandomId) {
  return ActiveFandomCollection.findByIdAndDelete(activeFandomId);
}

// To be implemented when active flag is added. Should not otherwise be updatable.
// function updateActiveFandom(activeFandomId, activeFlag) {
//   return FandomCollection.findByIdAndUpdate(fandomId, { active: activeFlag });
// }


module.exports = {
  addActiveFandom,
  deleteActiveFandom,
  getAllActiveFandoms,
  getActiveFandom,
}
