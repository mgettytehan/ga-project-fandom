const { fandomApi } = require('./db-fandom.js')
const { userApi } = require('./db-user');
const { userInFandomApi } = require('./db-userinfandom');
const { mediaTypeApi } = require('./db-mediatype.js');
const generalHelpers = require('./general-helpers.js')

async function getAllFandomsSorted() {
    const fandomsSorted = await fandomApi.getAll();
    return generalHelpers.sortAlphabeticallyByProperty(fandomsSorted, 'mediaName');
}

//to refactor
async function getAllFandomData (fandomId) {
    const users = await getUsersByFandomId(fandomId);
    const fandom = await fandomApi.getById(fandomId);
    const mediaType = await getMediaTypeByFandom(fandom);
    return { fandom, users, mediaType };
}

async function getFandomAndMediaTypes (fandomId) {
    const fandom = await fandomApi.getById(fandomId);
    const mediaTypes = await mediaTypeApi.getAll();
    return { fandom, mediaTypes };
}

async function getFandomsAndMediaTypes () {
    const fandoms = await fandomApi.getAll();
    const mediaTypes = await mediaTypeApi.getAll();
    return { fandoms, mediaTypes };
}

async function getUsersByFandomId (fandomId) {
    const relationships = await userInFandomApi.getByCriteria({ fandomId });
    const users = await Promise.all(
        relationships.map(relationship => userApi.getById(relationship.userId))
    )
    return generalHelpers.sortAlphabeticallyByProperty(users, 'username');
}

async function getMediaTypeByFandom (fandom) {
    return mediaTypeApi.getById(fandom.mediaTypeId);
}

async function deleteFandom(fandomId) {
    await userInFandomApi.deleteDocs({ fandomId });
    return await fandomApi.deleteDoc(fandomId);
}

module.exports = {
    deleteFandom,
    getAllFandomData,
    getAllFandomsSorted,
    getFandomAndMediaTypes,
    getFandomsAndMediaTypes
}