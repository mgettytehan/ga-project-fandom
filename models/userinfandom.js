const mongoose = require('./connection.js');

const UserInFandomSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  fandomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Fandom'},
});

const UserInFandomCollection = mongoose.model('UserInFandom', UserInFandomSchema);

function getAllUserInFandoms() {
  return UserInFandomCollection.find();
}

function getUserInFandom(userInFandomId) {
  return UserInFandomCollection.findById(userInFandomId);
}
//get by fandomId or userId
function getUserInFandomsByCriteria(criteria) {
  return UserInFandomCollection.find(criteria);
}

//intended to take an array of multiple
function addUserInFandoms(newUserInFandoms) {
  return UserInFandomCollection.insertMany(newUserInFandoms);
}

function deleteUserInFandom(userInFandomId) {
  return UserInFandomCollection.findByIdAndDelete(userInFandomId);
}

// To be implemented when active flag is added. Should not otherwise be updatable.
// function updateUserInFandom(userInFandomId, activeFlag) {
//   return FandomCollection.findByIdAndUpdate(fandomId, { active: activeFlag });
// }


module.exports = {
  addUserInFandoms,
  deleteUserInFandom,
  getAllUserInFandoms,
  getUserInFandom,
  getUserInFandomsByCriteria
}
