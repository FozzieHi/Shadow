const request = require('request');

class WorkerService {

    async addURL(vanityName, inviteCode) {
        const options = {
            url: 'https://vanity.shdw.cc',
            method: 'POST',
            headers: {
                'Vanity-URL': vanityName,
                'Invite': inviteCode
            }
        };

        request(options, function (err, res, body) {
            console.log(res.status + "; " + res.body);
        });
    }

    async getURL(vanityURL) {
        const options = {
            url: 'https://vanity.shdw.cc',
            method: 'GET',
            headers: {
                'Vanity-URL': vanityURL,
            }
        };
        let vanityCode = '';
        request(options, function (err, res, body) {
            vanityCode = res.body;
        });
        return vanityCode;
    }
}

module.exports = new WorkerService();
