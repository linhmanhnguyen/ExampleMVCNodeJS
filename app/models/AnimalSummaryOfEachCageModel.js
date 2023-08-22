class AnimalSummaryOfEachCageModel {
    constructor(cage_id, manager_fullname, totalAnimals, healtyAnimals, sickAnimals, deadAnimals) {
        this.cage_id = cage_id;
        this.manager_fullname = manager_fullname;
        this.totalAnimals = totalAnimals;
        this.healtyAnimals = healtyAnimals;
        this.sickAnimals = sickAnimals;
        this.deadAnimals = deadAnimals;
    }
}

module.exports = AnimalSummaryOfEachCageModel;