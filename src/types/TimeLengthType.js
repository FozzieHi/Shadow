const { TypeReader, TypeReaderResult } = require("patron.js");
const NumericUtils = require('../utils/NumericUtils.js');
const StringUtils = require('../utils/StringUtils.js');

class TimeLengthType extends TypeReader {
    constructor() {
        super({ type: 'timelength' });
    }

    async read(command, message, argument, args, input) {
        const time = input.toLowerCase();
        const timeNum = time.replace(/\D/g, '');
        let timeMS;
        let timeUnit;
        if (StringUtils.isNullOrWhiteSpace(timeNum)) {
            return TypeReaderResult.fromError(command, 'Invalid time format, formats: h (Hours), m (Minutes), d (Days).');
        }
        if (time.includes("h")) {
            timeMS = NumericUtils.hoursToMs(timeNum);
            timeUnit = 'hours';
        } else if (time.includes("m")) {
            timeMS = NumericUtils.minutesToMs(timeNum);
            timeUnit = 'minutes';
        } else if (time.includes("d")) {
            timeMS = NumericUtils.daysToMs(timeNum);
            timeUnit = 'days';
        } else if (!isNaN(time)) {
            timeMS = NumericUtils.minutesToMs(timeNum);
            timeUnit = 'minutes';
        } else {
            return TypeReaderResult.fromError(command, 'Invalid time format, formats: h (Hours), m (Minutes), d (Days).');
        }
        timeUnit += (parseInt(timeNum) !== 1 ? 's' : '');
        return TypeReaderResult.fromSuccess({ ms: timeMS, unit: timeUnit, num: timeNum });
    }
}

module.exports = new TimeLengthType();
