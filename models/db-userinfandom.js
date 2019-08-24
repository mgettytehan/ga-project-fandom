const mongoose = require('./connection.js');

const UserInFandomSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  fandomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Fandom'},
});

const UserInFandomCollection = mongoose.model('UserInFandom', UserInFandomSchema);

function getAllUserInFandoms() {
  return UserInFandomCollection.find();
}

//get by fandomId or userId
function getUserInFandoms(criteria) {
  return UserInFandomCollection.find(criteria);
}

//intended to take an array of multiple
function addUserInFandoms(newUserInFandoms) {
  return UserInFandomCollection.insertMany(newUserInFandoms);
}
//provide fandom id, user id
function deleteUserInFandoms(criteria) {
  return UserInFandomCollection.deleteMany(criteria);
}

// To be implemented when active flag is added. Should not otherwise be updatable.
// function updateUserInFandom(userInFandomId, activeFlag) {
//   return FandomCollection.findByIdAndUpdate(fandomId, { active: activeFlag });
// }


module.exports = {
  addUserInFandoms,
  deleteUserInFandoms,
  getAllUserInFandoms,
  getUserInFandoms
}
