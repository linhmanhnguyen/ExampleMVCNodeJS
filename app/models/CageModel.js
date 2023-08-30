class CageModel {
    constructor(livestockStaff_id, veterinaryStaff_id, numberOfAnimalsInCage) {
        this.livestockStaff_id = livestockStaff_id;
        this.veterinaryStaff_id = veterinaryStaff_id;
        this.numberOfAnimalsInCage = numberOfAnimalsInCage;
    }
}

module.exports = CageModel;