class StringUtil {
    boldify(str) {
        return '**' + str.replace(/([*~`_])+/g, '') + '**';
    }
}
module.exports = new StringUtil();
