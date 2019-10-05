module.exports = async (promise) => {
    try {
        await promise;
        return true;
    } catch (err) {
        return false;
    }
};
