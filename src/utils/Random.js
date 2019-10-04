class Random {
    static nextInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static arrayElement(array) {
        return array[this.nextInt(0, array.length)];
    }
}

module.exports = Random;
