const fandomDbApi = require('./db-fandom');
const userInFandomDbApi = require('./db-userinfandom');

function getFandomsByUserId (userId) {
    return userInFandomDbApi.getUserInFandomsByCriteria({ userId })
    .then(
        userInFandoms => {
            return Promise.all(
                userInFandoms.map(userInFandom => fandomDbApi.getFandom(userInFandom.fandomId))
            )
        }
    )
}

module.exports = {
    getFandomsByUserId
}