const aws = require('aws-sdk');
const ddb = new aws.DynamoDB.DocumentClient({ region: 'eu-west-3' });

module.exports.getUsers = function getUsers() {
    const params = {
        TableName: 'twitter_users'
    }
    return ddb.scan(params).promise();
}

module.exports.updateUser =  async function updateUser(username, tweetCount) {
    const params = {
        TableName: 'twitter_users',
        Key: {
            username: username
        },
        UpdateExpression: 'set tweetCount = :tweetCount, lastUpdate = :lastUpdate',
        ExpressionAttributeValues: {
            ':tweetCount': tweetCount,
            ':lastUpdate': new Date().toUTCString()
        },
        ReturnValues: 'UPDATED_NEW'
    };
    return ddb.update(params).promise();
}
