const request = require('request');

class WorkerService {

    async addURL(vanityName, inviteCode) {
        const options = {
            url: 'https://vanity.shdw.cc',
            method: 'POST',
            headers: {
                'Vanity-URL': vanityName,
                'Invite': inviteCode,
                'Action': 'Add'
            }
        };

        request(options, function (err, res, body) {
            console.log(res.statusCode + "; " + body);
        });
    }

    async deleteURL(vanityName) {
        const options = {
            url: 'https://vanity.shdw.cc',
            method: 'POST',
            headers: {
                'Vanity-URL': vanityName,
                'Action': 'Delete'
            }
        };

        request(options, function (err, res, body) {
            console.log(res.statusCode + "; " + body);
        });
    }
}

module.exports = new WorkerService();
