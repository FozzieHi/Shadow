class PushUpdate {
    constructor(property, value) {
        this.$push = {
            [property]: value
        };
    }
}

module.exports = PushUpdate;
