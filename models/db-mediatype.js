const mongoose = require('./connection.js');

const MediaTypeSchema = new mongoose.Schema({
  typeName: String
});

const MediaTypeCollection = mongoose.model('MediaType', MediaTypeSchema);

function getAllMediaTypes() {
  return MediaTypeCollection.find();
}

function getMediaType(typeId) {
  return MediaTypeCollection.findById(typeId);
}

function addMediaType(mediaType) {
  return MediaTypeCollection.insertMany(mediaType);
}

function updateMediaType(typeId, changedMediaType) {
  return MediaTypeCollection.findByIdAndUpdate(typeId, changedMediaType);
}

function deleteMediaType(typeId) {
  return MediaTypeCollection.findByIdAndDelete(typeId);
}


module.exports = {
  addMediaType,
  deleteMediaType,
  getAllMediaTypes,
  getMediaType,
  updateMediaType
}
