class AddSerialNumber {
    static addSerialNumber(stableNumber) {
        const paddedNumber = stableNumber < 10 ? `0${stableNumber}` : stableNumber;
        return paddedNumber;
    }
}

module.exports = AddSerialNumber;