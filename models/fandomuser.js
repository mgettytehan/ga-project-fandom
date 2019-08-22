const userInFandomApi = require('./userinfandom.js');
const FandomApi = require('./fandom.js');
const UserApi = require('./user.js')

function getFandomsByUserId (userId) {
    return UserInFandomApi.getUserInFandomsByCriteria({ userId: userId })
    .then(
        userInFandoms => {
            return Promise.all(
                userInFandoms.map(userInFandom => FandomApi.getFandom(userInFandom.fandomId))
            )
        }
    )
}

function getUsersByFandomId (fandomId) {
    return userInFandomApi.getUserInFandomsByCriteria({ fandomId: fandomId })
    .then(
        userInFandoms => {
            return Promise.all(
                userInFandoms.map(userInFandom => UserApi.getUser(userInFandom.userId))
            )
        }
    )
}

module.exports = {
    getFandomsByUserId,
    getUsersByFandomId
}