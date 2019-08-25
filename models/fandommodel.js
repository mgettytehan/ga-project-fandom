const fandomDbApi = require('./db-fandom.js')
const userDbApi = require('./db-user');
const userInFandomDbApi = require('./db-userinfandom');
const mediaTypeDbApi = require('./db-mediatype.js');
const generalHelpers = require('./general-helpers.js')

async function getAllFandomsSorted() {
    const fandomsSorted = await fandomDbApi.getAllFandoms();
    return generalHelpers.sortAlphabeticallyByProperty(fandomsSorted, 'mediaName');
}

//to refactor
async function getAllFandomData (fandomId) {
    const users = await getUsersByFandomId(fandomId);
    const fandom = await fandomDbApi.getFandom(fandomId);
    const mediaType = await getMediaTypeByFandom(fandom);
    return { fandom, users, mediaType };
}

async function getFandomAndMediaTypes (fandomId) {
    const fandom = await fandomDbApi.getFandom(fandomId);
    const mediaTypes = await mediaTypeDbApi.getAllMediaTypes();
    return { fandom, mediaTypes };
}

async function getFandomsAndMediaTypes () {
    const fandoms = await fandomDbApi.getAllFandoms();
    const mediaTypes = await mediaTypeDbApi.getAllMediaTypes();
    return { fandoms, mediaTypes };
}

async function getUsersByFandomId (fandomId) {
    const relationships = await userInFandomDbApi.getUserInFandoms({ fandomId });
    const users = await Promise.all(
        relationships.map(relationship => userDbApi.getUser(relationship.userId))
    )
    return generalHelpers.sortAlphabeticallyByProperty(users, 'username');
}

async function getMediaTypeByFandom (fandom) {
    return mediaTypeDbApi.getMediaType(fandom.mediaTypeId)
}

module.exports = {
    getAllFandomData,
    getAllFandomsSorted,
    getFandomAndMediaTypes,
    getFandomsAndMediaTypes
}