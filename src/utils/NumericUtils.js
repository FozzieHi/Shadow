class NumberUtil {
    isEven(num) {
        return num % 2 === 0;
    }

    msToTime(input) {
        return {
            milliseconds: parseInt((input % 1000) / 100),
            seconds: parseInt((input / 1000) % 60),
            minutes: parseInt((input / (1000 * 60)) % 60),
            hours: parseInt((input / (1000 * 60 * 60)) % 24),
            days: parseInt(input / (1000 * 60 * 60 * 24))
        };
    }

    hoursToMs(input) {
        return input * 3600000;
    }

    minutesToMs(input) {
        return input * 60000;
    }

    daysToMs(input) {
        return input * 86400000;
    }

    pad(num, size) {
        let s = num.toString();

        while (s.length < size) {
            s = '0' + s;
        }

        return s;
    }
}

module.exports = new NumberUtil();
