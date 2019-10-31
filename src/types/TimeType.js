const { TypeReader, TypeReaderResult } = require("patron.js");
const NumericUtils = require('../utils/NumericUtils.js');

class TimeType extends TypeReader {
    constructor() {
        super({ type: 'timelength' });
    }

    async read(command, message, argument, args, input) {
        const time = input.toLowerCase();
        const timeNum = time.replace(/\D/g, '');
        let timeMS;
        let timeUnit;
        if (time.includes("h")) {
            timeMS = NumericUtils.hoursToMs(timeNum);
            timeUnit = 'hour';
        } else if (time.includes("m")) {
            timeMS = NumericUtils.minutesToMs(timeNum);
            timeUnit = 'minute';
        } else if (time.includes("d")) {
            timeMS = NumericUtils.daysToMs(timeNum);
            timeUnit = 'day';
        } else if (!isNaN(time)) {
            timeMS = NumericUtils.minutesToMs(timeNum);
            timeUnit = 'minute';
        } else {
            return TypeReaderResult.fromError(command, 'Invalid time format, formats: h (Hours), m (Minutes), d (Days).');
        }
        timeUnit += (parseInt(timeNum) !== 1 ? 's' : '');
        return TypeReaderResult.fromSuccess({ ms: timeMS, unit: timeUnit, num: timeNum });
    }
}

module.exports = new TimeType();
