class StringUtil {
    boldify(str) {
        return '**' + str.replace(/([*~`_])+/g, '') + '**';
    }

    isNullOrWhiteSpace(input) {
        return typeof input !== 'string' || input.replace(/\s+/g, '').length === 0;
    }
}
module.exports = new StringUtil();
