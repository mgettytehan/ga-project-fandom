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
//expect array of fandom Ids to add and to remove
async function addFandomsToUser (userId, fandomIds) {
    const newFandoms = fandomIds.map(fandomId => { fandomId, userId });
    return await userInFandomDbApi.addUserInFandoms(newFandoms);
}

async function removeFandomsFromUser (userId, fandomIds) {
    return await Promise.all(
        fandomIds.map(fandomId => userInFandomDbApi.deleteUserInFandoms({ userId, fandomId })
        )
    );
}
//to rework
async function getFandomsInAndNotIn (userId) {
    const userFandoms = await getFandomsByUserId(userId);
    const userFandomIds = userFandoms.map(userFandom => String(userFandom._id));
    const allFandoms = await fandomDbApi.getAllFandoms();
    const notUserFandoms = allFandoms.filter(fandom => {
        return !(userFandomIds.includes(String(fandom._id)));
    });
    return { userFandoms, notUserFandoms };
}

module.exports = {
    addFandomsToUser,
    getFandomsByUserId,
    getFandomsInAndNotIn,
    removeFandomsFromUser
}