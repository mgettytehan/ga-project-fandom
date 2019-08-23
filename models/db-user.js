const mongoose = require('./connection.js');

const UserSchema = new mongoose.Schema({
  username: String,
  bio: String,
  joinDate: Date,
  link: String
});

const UserCollection = mongoose.model('User', UserSchema);

function getAllUsers() {
  return UserCollection.find();
}

function getUser(userId) {
  return UserCollection.findById(userId);
}

function addUser(newUser) {
  newUser.joinDate = new Date();
  return UserCollection.insertMany(newUser);
}

function updateUser(userId, changedUser) {
  return UserCollection.findByIdAndUpdate(userId, changedUser);
}

function deleteUser(userId) {
  return UserCollection.findByIdAndDelete(userId);
}


module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
}