const request = require('request-promise');

module.exports = (url, data = true, method = 'GET') => {
    let options = {
        uri: url, 
        method: method,
        json: data
    };
    return request(options).then(function(data) {
        return data;
    }).catch(function (err) {
        return err.error;
    });
}