class NumberUtil {
    isEven(num) {
        return num % 2 === 0;
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
