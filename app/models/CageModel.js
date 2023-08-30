class CageModel {
    constructor(livestockStaff_id, veterinaryStaff_id, animal_count) {
        this.livestockStaff_id = livestockStaff_id;
        this.veterinaryStaff_id = veterinaryStaff_id;
        this.animal_count = animal_count;
    }
}

module.exports = CageModel;