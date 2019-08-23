const fandomDbApi = require('./db-fandom.js')
const userDbApi = require('./db-user');
const userInFandomDbApi = require('./db-userinfandom');
const mediaTypeDbApi = require('./db-mediatype.js');

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
    return userInFandomDbApi.getUserInFandomsByCriteria({ fandomId })
    .then(
        userInFandoms => {
            return Promise.all(
                userInFandoms.map(userInFandom => userDbApi.getUser(userInFandom.userId))
            )
        }
    )
}

async function getMediaTypeByFandom (fandom) {
    return mediaTypeDbApi.getMediaType(fandom.mediaTypeId)
}

module.exports = {
    getAllFandomData,
    getFandomAndMediaTypes,
    getFandomsAndMediaTypes
}