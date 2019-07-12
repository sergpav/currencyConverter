const   request = require('request-promise'),
        getData = require('../helpers/functions/get.data'),
        formatResponse = require('../helpers/functions/format.response'),
        formatToEndpoint = require('../helpers/functions/format.to.endpoint');

module.exports.trans = () => new Promise( (resolve, reject) => {
    getData(process.env.SERVICE_ENDPOINT).then(function(response) {
        if(response.message) {
            throw response.message;
        } else {
            return formatResponse(response);
        }
    }).then( async(resultOfResponse) => {
        if(resultOfResponse.url && resultOfResponse.data) {
            let currData = await getData(resultOfResponse.url);
            resultOfResponse.curr = currData;
            return resultOfResponse;
        } else {
            throw "no data";
        }
    }).then((response) => {
        if(response.data && response.curr.rates) {
            resolve(formatToEndpoint(response.data, response.curr.rates));
        } else {
            reject('no data');
        }
    }).catch((err) => {
        throw(err);
    });
   
});