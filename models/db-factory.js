const mongoose = require('./connection.js');

const dbModel = function(modelName, schema) {
    const ModelSchema = new mongoose.Schema(schema);
    const ModelCollection = mongoose.model(modelName, ModelSchema);
    const newDbModel = {
        schema: ModelSchema,
        collection: ModelCollection,
        getAll() {
            return this.collection.find();
        },
        getById(documentId) {
            return this.collection.findById(documentId);
        },
        getByCriteria(criteria) {
            return this.collection.find(criteria);
        },
        addDocs(newDocuments) {
            return this.collection.insertMany(newDocuments);
        },
        updateDoc(documentId, updatedDocument) {
            return this.collection.findByIdAndUpdate(documentId, updatedDocument);
        },
        deleteDoc(documentId) {
            return this.collection.findByIdAndDelete(documentId);
        }
    };
    return newDbModel;
}

module.exports = {
    dbModel
};