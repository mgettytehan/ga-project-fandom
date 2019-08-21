const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
  username: String,
  bio: String,
  link: String
})

const UserCollection = mongoose.model('User', UserSchema)



module.exports = {

}
