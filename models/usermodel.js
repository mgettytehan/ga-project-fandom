const { fandomApi } = require('./db-fandom');
const { userApi } = require('./db-user');
const { userInFandomApi } = require('./db-userinfandom');
const generalHelpers = require('./general-helpers.js');

async function addUserWithDate(user) {
    user.joinDate = new Date();
    return userApi.addDocs(user);
}

async function getFandomsByUserId (userId) {
    const relationships = await userInFandomApi.getByCriteria({ userId });
    const fandoms = await Promise.all(
        relationships.map(relationship => fandomApi.getById(relationship.fandomId))
    );
    return generalHelpers.sortAlphabeticallyByProperty(fandoms, 'mediaName'); 
}

function getIdsFromForm(formData) {
    console.log(typeof formData.fandoms)
    if (typeof formData.fandoms === 'string') {
        return [formData.fandoms];
    } else {
        return formData.fandoms;
    }
}

//expect array of fandom Ids to add and to remove
async function addFandomsToUser (userId, formData) {
    const newFandoms = getIdsFromForm(formData).map(
        fandomId => { return { fandomId, userId } }
    );
    return await userInFandomApi.addDocs(newFandoms);
}

async function removeFandomsFromUser (userId, formData) {
    const fandomIds = getIdsFromForm(formData);
    return await Promise.all(
        fandomIds.map(fandomId => userInFandomApi.deleteDocs({ userId, fandomId })
        )
    );
}
//to rework
async function getFandomsInAndNotIn (userId) {
    const allFandoms = generalHelpers.sortAlphabeticallyByProperty(await fandomApi.getAll(), 'mediaName');
    const userFandoms = await getFandomsByUserId(userId);
    let notUserFandoms;
    try{
        const userFandomIds = userFandoms.map(userFandom => String(userFandom._id));
        notUserFandoms = allFandoms.filter(fandom => {
            return !(userFandomIds.includes(String(fandom._id)));
        });
    }
    catch(err) {
        console.log('User had no fandoms');
        notUserFandoms = allFandoms;
    }
    return { userId, userFandoms, notUserFandoms };
}

module.exports = {
    addFandomsToUser,
    addUserWithDate,
    getFandomsByUserId,
    getFandomsInAndNotIn,
    removeFandomsFromUser
}