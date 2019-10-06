const NumberUtil = require('./NumericUtils.js');

class DateUtils {
    UTCTime(date) {
        return NumberUtil.pad(date.getUTCHours(), 2) + ':' + NumberUtil.pad(date.getUTCMinutes(), 2) + ':' + NumberUtil.pad(date.getUTCSeconds(), 2);
    }

    UTCDate(date) {
        return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
    }
}

module.exports = new DateUtils();
