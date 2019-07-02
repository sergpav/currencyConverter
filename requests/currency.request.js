const rp = require('request-promise');

module.exports = async function() {
    const uri = 'https://7np770qqk5.execute-api.eu-west-1.amazonaws.com/prod/get-transaction';
    
    var options = {
        uri,
        json: true
    };

    const data = await(rp(options));
    console.log(data);
};