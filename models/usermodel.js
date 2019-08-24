const fandomDbApi = require('./db-fandom');
const userInFandomDbApi = require('./db-userinfandom');

function getFandomsByUserId (userId) {
    return userInFandomDbApi.getUserInFandoms({ userId })
    .then(
        userInFandoms => {
            return Promise.all(
                userInFandoms.map(userInFandom => fandomDbApi.getFandom(userInFandom.fandomId))
            )
        }
    )
}

function getIdsFromForm(formData) {
    if (typeof formData.fandoms === Array) {
        return formData.fandoms;
    } else {
        return [formData.fandoms];
    }
}

//expect array of fandom Ids to add and to remove
async function addFandomsToUser (userId, formData) {
    console.log(formData)
    const newFandoms = getIdsFromForm(formData).map(
        fandomId => { return { fandomId, userId } }
    );
    return await userInFandomDbApi.addUserInFandoms(newFandoms);
}

async function removeFandomsFromUser (userId, formData) {
    const fandomIds = getIdsFromForm(formData);
    return await Promise.all(
        fandomIds.map(fandomId => userInFandomDbApi.deleteUserInFandoms({ userId, fandomId })
        )
    );
}
//to rework
async function getFandomsInAndNotIn (userId) {
    const allFandoms = await fandomDbApi.getAllFandoms();
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
    getFandomsByUserId,
    getFandomsInAndNotIn,
    removeFandomsFromUser
}