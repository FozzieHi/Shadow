class PullUpdate {
    constructor(property, value) {
        this.$pull = {
            [property]: value
        };
    }
}

module.exports = PullUpdate;
