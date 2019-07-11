const   currencyRequest = require('./currency.request'),
        request = require('request');

module.exports.transactions = () => new Promise(async (resolve, reject) => {
    const data = await currencyRequest();
        options = {
            uri: process.env.PROCESS_ENDPOINT,
            method: 'POST',
            json: data
        };
    request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            let arr = {'response':JSON.stringify(body), 'request':JSON.stringify(data)};
            resolve(arr);
        } else if (err) {
            reject({ error: err });
        }
    });
});