const userDbApi = require('./db-user');
const userInFandomDbApi = require('./db-userinfandom');

function getUsersByFandomId (fandomId) {
    return userInFandomDbApi.getUserInFandomsByCriteria({ fandomId })
    .then(
        userInFandoms => {
            return Promise.all(
                userInFandoms.map(userInFandom => userDbApi.getUser(userInFandom.userId))
            )
        }
    )
}

module.exports = {
    getUsersByFandomId
}